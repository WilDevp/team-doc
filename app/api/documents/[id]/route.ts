import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return new NextResponse('No autorizado', { status: 401 })
        }

        const documentId = await Promise.resolve(params.id)

        // Verificar si el documento existe y si el usuario es el autor
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            select: {
                authorId: true,
                messages: true,
                comments: true,
                versions: true
            }
        })

        if (!document) {
            return new NextResponse('Documento no encontrado', { status: 404 })
        }

        if (document.authorId !== session.user.id) {
            return new NextResponse('No tienes permiso para eliminar este documento', { status: 403 })
        }

        // Eliminar registros relacionados primero
        await prisma.$transaction([
            // Eliminar mensajes
            prisma.message.deleteMany({
                where: { documentId }
            }),
            // Eliminar comentarios
            prisma.comment.deleteMany({
                where: { documentId }
            }),
            // Eliminar versiones
            prisma.documentVersion.deleteMany({
                where: { documentId }
            }),
            // Finalmente eliminar el documento
            prisma.document.delete({
                where: { id: documentId }
            })
        ])

        return NextResponse.json({
            success: true,
            message: 'Documento eliminado exitosamente'
        })
    } catch (error) {
        console.error('Error al eliminar documento:', error)
        return new NextResponse('Error interno del servidor', { status: 500 })
    }
}