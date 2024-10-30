'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShareDialog } from './share-dialog'
import { DocumentChat } from '../document/chat'
import { FileText, MoreVertical } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

interface Document {
    id: string
    title: string
    content: string
    updatedAt: string
}

export function DocumentList() {
    const { session } = useAuth()
    const [documents, setDocuments] = useState<Document[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('/api/documents')
                if (!response.ok) {
                    throw new Error('Failed to fetch documents')
                }
                const data = await response.json()
                setDocuments(data)
            } catch (error) {
                console.error('Error fetching documents:', error)
                toast.error('Error al cargar los documentos')
            } finally {
                setIsLoading(false)
            }
        }

        fetchDocuments()
    }, [])

    if (isLoading) {
        return <div>Cargando documentos...</div>
    }

    if (documents.length === 0) {
        return <div>No hay documentos disponibles.</div>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
                <Card key={doc.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                        <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <CardTitle className="text-base">{doc.title}</CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                            <DocumentChat documentId={doc.id} />
                            <ShareDialog documentId={doc.id} />
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="mb-4">{doc.content.substring(0, 100)}...</CardDescription>
                        <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Actualizado: {new Date(doc.updatedAt).toLocaleDateString()}
              </span>
                            <Link href={`/documents/${doc.id}`}>
                                <Button variant="outline" size="sm">
                                    Ver documento
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}