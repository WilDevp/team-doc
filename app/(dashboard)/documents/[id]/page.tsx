'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MarkdownEditor } from '@/components/dashboard/markdown-editor'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

export default function DocumentPage() {
    const params = useParams()
    const documentId = params?.id as string
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { session } = useAuth()

    useEffect(() => {
        const fetchDocument = async () => {
            if (!documentId) return

            try {
                const response = await fetch(`/api/documents/${documentId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch document')
                }
                const data = await response.json()
                setTitle(data.title)
                setContent(data.content)
            } catch (error) {
                console.error('Error fetching document:', error)
                toast.error('Error al cargar el documento')
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
                body: JSON.stringify({ title, content }),
            })

            if (!response.ok) {
                throw new Error('Failed to save document')
            }

            toast.success('Documento guardado exitosamente')
        } catch (error) {
            console.error('Error saving document:', error)
            toast.error('Error al guardar el documento')
        }
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
                <Button onClick={handleSave}>Guardar</Button>
            </div>
            <MarkdownEditor value={content} onChange={setContent} />
        </div>
    )
}