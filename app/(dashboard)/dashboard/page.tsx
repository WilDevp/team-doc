'use client'

import { useAuth } from '@/hooks/use-auth'
import { DocumentList } from '@/components/dashboard/document-list'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Users, FileText, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    const { isAdmin } = useAuth()

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    {isAdmin ? 'Panel de administración' : 'Mi espacio de trabajo'}
                </h1>
                <Link href="/documents/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo documento
                    </Button>
                </Link>
            </div>

            {isAdmin ? (
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Usuarios
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Documentos Creados
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">142</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Documentos Compartidos
                            </CardTitle>
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">89</div>
                        </CardContent>
                    </Card>
                </div>
            ) : null}

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                    {isAdmin ? 'Documentos recientes' : 'Mis documentos'}
                </h2>
                <DocumentList />
            </div>
        </div>
    )
}