'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MarkdownEditor } from '@/components/dashboard/markdown-editor'
import { ShareDialog } from '@/components/dashboard/share-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Trash2, Save } from 'lucide-react'

interface Document {
    id: string
    title: string
    content: string
    updatedAt: string
}

export default function DocumentPage() {
    const params = useParams()
    const router = useRouter()
    const [document, setDocument] = useState<Document | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                // Simular llamada a la API
                await new Promise(resolve => setTimeout(resolve, 1000))
                // En producción, aquí harías un fetch real
                setDocument({
                    id: params.id as string,
                    title: 'Documento de ejemplo',
                    content: '# Bienvenido\n\nEste es un documento de ejemplo.',
                    updatedAt: new Date().toISOString(),
                })
                setTitle('Documento de ejemplo')
                setContent('# Bienvenido\n\nEste es un documento de ejemplo.')
            } catch (error) {
                toast.error('Error al cargar el documento')
            } finally {
                setIsLoading(false)
            }
        }

        fetchDocument()
    }, [params.id])

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Simular guardado
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.success('Documento guardado correctamente')
        } catch (error) {
            toast.error('Error al guardar el documento')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        try {
            // Simular eliminación
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.success('Documento eliminado correctamente')
            router.push('/dashboard')
        } catch (error) {
            toast.error('Error al eliminar el documento')
        }
    }

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-[300px]" />
                    <div className="space-x-2">
                        <Skeleton className="h-10 w-[100px] inline-block" />
                        <Skeleton className="h-10 w-[100px] inline-block" />
                    </div>
                </div>
                <Skeleton className="h-[600px] w-full" />
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl font-bold w-[300px]"
                />
                <div className="space-x-2">
                    <ShareDialog />
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        variant="outline"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. El documento será eliminado permanentemente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Editor</h2>
                    <MarkdownEditor
                        value={content}
                        onChange={setContent}
                    />
                </div>
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Vista previa</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none p-4 rounded-lg border bg-background">
                        {/* Aquí necesitarías un componente para renderizar Markdown */}
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
            </div>
        </div>
    )
}