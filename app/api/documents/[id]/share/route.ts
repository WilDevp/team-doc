import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const documentId = await Promise.resolve(context.params.id)
        const { email } = await request.json()

        if (!documentId || !email) {
            return new NextResponse('Document ID and email are required', { status: 400 })
        }

        // Verificar si el documento existe y el usuario tiene permisos
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            include: { author: true, collaborators: true },
        })

        if (!document) {
            return new NextResponse('Document not found', { status: 404 })
        }

        if (document.authorId !== session.user.id) {
            return new NextResponse('Not authorized to share this document', { status: 403 })
        }

        // Buscar el usuario con quien se quiere compartir
        const userToShare = await prisma.user.findUnique({
            where: { email },
        })

        if (!userToShare) {
            return new NextResponse('User not found', { status: 404 })
        }

        // Verificar si ya está compartido con este usuario
        const isAlreadyShared = document.collaborators.some(
            (collaborator) => collaborator.id === userToShare.id
        )

        if (isAlreadyShared) {
            return new NextResponse('Document already shared with this user', { status: 400 })
        }

        // Compartir el documento
        const updatedDocument = await prisma.document.update({
            where: { id: documentId },
            data: {
                collaborators: {
                    connect: { id: userToShare.id },
                },
            },
            include: {
                collaborators: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })

        return NextResponse.json(updatedDocument)
    } catch (error) {
        console.error('Error sharing document:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}