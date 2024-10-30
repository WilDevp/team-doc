'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShareDialog } from './share-dialog'
import { DocumentChat } from '../document/chat'
import { FileText, MoreVertical, User } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Document {
    id: string
    title: string
    content: string
    updatedAt: string
    author: {
        id: string
        name: string
        email: string
        role: string
    }
}

interface DocumentListProps {
    filter: 'created' | 'shared'
}

export function DocumentList({ filter }: DocumentListProps) {
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

                const filteredDocs = filter === 'created'
                    ? data.filter((doc: Document) => doc.author.id === session?.user?.id)
                    : data.filter((doc: Document) => doc.author.id !== session?.user?.id)

                setDocuments(filteredDocs)
            } catch (error) {
                console.error('Error fetching documents:', error)
                toast.error('Error al cargar los documentos')
            } finally {
                setIsLoading(false)
            }
        }

        fetchDocuments()
    }, [filter, session?.user?.id])

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((n) => (
                    <Card key={n} className="animate-pulse">
                        <CardHeader className="h-[100px] bg-muted" />
                        <CardContent className="h-[100px] bg-muted mt-4" />
                    </Card>
                ))}
            </div>
        )
    }

    if (documents.length === 0) {
        return (
            <Card className="p-8 text-center">
                <CardDescription>
                    {filter === 'created'
                        ? 'No has creado ningún documento aún.'
                        : 'No tienes documentos compartidos.'}
                </CardDescription>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
                <Card key={doc.id} className="flex flex-col">
                    <CardHeader className="space-y-0 pb-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <FileText className="h-4 w-4 flex-shrink-0" />
                                <CardTitle className="text-base truncate">
                                    {doc.title}
                                </CardTitle>
                            </div>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <Badge variant={doc.author.role === 'ADMIN' ? 'default' : 'secondary'} className="h-5">
                                <User className="w-3 h-3 mr-1" />
                                {doc.author.role === 'ADMIN' ? 'Admin' : 'Usuario'}
                            </Badge>
                            <Badge variant="outline" className="h-5">
                                Team Doc
                            </Badge>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4 flex-1">
                        <div className="space-y-4">
                            <CardDescription className="min-h-[40px]">
                                {doc.content || 'Sin contenido'}
                            </CardDescription>
                            <div className="flex items-center text-xs text-muted-foreground">
                                Actualizado: {new Date(doc.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                    </CardContent>
                    <CardContent className="pt-0 pb-4">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <DocumentChat documentId={doc.id} />
                                <ShareDialog documentId={doc.id} />
                            </div>
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