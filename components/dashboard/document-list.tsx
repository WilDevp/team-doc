import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShareDialog } from './share-dialog'
import { FileText, MoreVertical } from 'lucide-react'

export function DocumentList() {
    // Ejemplo de documentos (en producción vendrían de una base de datos)
    const documents = [
        {
            id: 1,
            title: 'Guía de inicio',
            description: 'Documento de bienvenida para nuevos usuarios',
            updatedAt: '2024-01-20',
        },
        {
            id: 2,
            title: 'Roadmap Q1 2024',
            description: 'Planificación del primer trimestre',
            updatedAt: '2024-01-19',
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
                <Card key={doc.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                        <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <CardTitle className="text-base">{doc.title}</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="mb-4">{doc.description}</CardDescription>
                        <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Actualizado: {doc.updatedAt}
              </span>
                            <ShareDialog />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}