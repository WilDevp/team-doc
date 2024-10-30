'use client'

import { useEffect, useState } from 'react'
import { DocumentList } from '@/components/dashboard/document-list'
import { CreateDocument } from '@/components/dashboard/create-document'
import { useAuth } from '@/hooks/use-auth'
import { Card } from '@/components/ui/card'
import { Users, FileText, Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface Stats {
    totalUsers: number
    totalDocuments: number
    sharedDocuments: number
}

export default function DashboardPage() {
    const { isAdmin } = useAuth()
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalDocuments: 0,
        sharedDocuments: 0,
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('/api/stats')

                if (!response.ok) {
                    throw new Error('Error al obtener estadísticas')
                }

                const data = await response.json()
                setStats(data)
            } catch (error) {
                console.error('Error fetching stats:', error)
                toast.error('Error al cargar las estadísticas')
            } finally {
                setIsLoading(false)
            }
        }

        if (isAdmin) {
            fetchStats()
        }
    }, [isAdmin])

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    {isAdmin ? 'Panel de administración' : 'Mi espacio de trabajo'}
                </h1>
                <CreateDocument />
            </div>

            {isAdmin && (
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Usuarios
                                </p>
                                <p className="text-2xl font-bold">
                                    {isLoading ? '...' : stats.totalUsers}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Documentos Creados
                                </p>
                                <p className="text-2xl font-bold">
                                    {isLoading ? '...' : stats.totalDocuments}
                                </p>
                            </div>
                            <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Documentos Compartidos
                                </p>
                                <p className="text-2xl font-bold">
                                    {isLoading ? '...' : stats.sharedDocuments}
                                </p>
                            </div>
                            <Share2 className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </Card>
                </div>
            )}

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                    {isAdmin ? 'Documentos recientes' : 'Mis documentos'}
                </h2>
                <DocumentList />
            </div>
        </div>
    )
}