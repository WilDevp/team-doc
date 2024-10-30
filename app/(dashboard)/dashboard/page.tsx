import { DocumentList } from '@/components/dashboard/document-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Link href="/documents/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo documento
                    </Button>
                </Link>
            </div>
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Documentos recientes</h2>
                <DocumentList />
            </div>
        </div>
    )
}