'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MarkdownEditor } from '@/components/dashboard/markdown-editor'
import { InlineComments } from '@/components/document/inline-comments'
import { Mentions } from '@/components/document/mentions'
import { VersionHistory } from '@/components/document/version-history'
import { ShareDialog } from '@/components/dashboard/share-dialog'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

export default function DocumentPage() {
    const params = useParams()
    const router = useRouter()
    const documentId = params?.id as string
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { session } = useAuth()

    useEffect(() => {
        const fetchDocument = async () => {
            if (!documentId) return

            try {
                const response = await fetch(`/api/documents/${documentId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                })

                if (!response.ok) {
                    throw new Error('Error al cargar el documento')
                }

                const data = await response.json()
                setTitle(data.title)
                setContent(data.content || '') // Ensure content is never null
            } catch (error) {
                console.error('Error fetching document:', error)
                toast.error('Error al cargar el documento')
            } finally {
                setIsLoading(false)
            }
        }

        fetchDocument()
    }, [documentId])

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/documents/${documentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    content: content || '' // Ensure content is never null
                }),
            })

            if (!response.ok) {
                throw new Error('Error al guardar el documento')
            }

            toast.success('Documento guardado exitosamente')
        } catch (error) {
            console.error('Error saving document:', error)
            toast.error('Error al guardar el documento')
        }
    }

    const handleMention = (user: { name: string }) => {
        setContent(prevContent => `${prevContent} @${user.name} `)
    }

    if (isLoading) {
        return <div className="p-6">Cargando...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <Input
                    type="text"
                    placeholder="Título del documento"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl font-bold w-[300px]"
                />
                <div className="flex items-center space-x-2">
                    <Mentions onMention={handleMention} />
                    <VersionHistory />
                    <ShareDialog documentId={documentId} />
                    <Button onClick={handleSave}>Guardar</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Editor</h2>
                    <MarkdownEditor
                        value={content}
                        onChange={setContent}
                    />
                </div>

            </div>
        </div>
    )
}