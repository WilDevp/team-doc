import { DocumentList } from '@/components/dashboard/document-list'
import { FolderTree } from '@/components/dashboard/folder-tree'
import { TagManager } from '@/components/dashboard/tag-manager'
import { SearchFilters } from '@/components/dashboard/search-filters'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    return (
        <div className="flex h-[calc(100vh-4rem)]">
            <div className="w-64 p-4 border-r space-y-6">
                <FolderTree />
                <TagManager />
            </div>
            <div className="flex-1 p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <Link href="/documents/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo documento
                        </Button>
                    </Link>
                </div>
                <SearchFilters />
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Documentos recientes</h2>
                    <DocumentList />
                </div>
            </div>
        </div>
    )
}