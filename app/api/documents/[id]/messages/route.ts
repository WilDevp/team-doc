import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const documentId = await Promise.resolve(context.params.id)
        if (!documentId) {
            return new NextResponse('Document ID is required', { status: 400 })
        }

        const messages = await prisma.message.findMany({
            where: {
                documentId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        })

        return NextResponse.json(messages)
    } catch (error) {
        console.error('Error al obtener mensajes:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}