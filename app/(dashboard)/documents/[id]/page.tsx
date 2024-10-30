'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { DocumentChat } from '@/components/document/chat'
import { InlineComments } from '@/components/document/inline-comments'
import { Mentions } from '@/components/document/mentions'
import { VersionHistory } from '@/components/document/version-history'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MarkdownEditor } from '@/components/dashboard/markdown-editor'
import { ShareDialog } from '@/components/dashboard/share-dialog'
import { useAuth } from '@/hooks/use-auth'

export default function DocumentPage() {
    const params = useParams()
    const documentId = params?.id as string
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { isAdmin } = useAuth()

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
                    <DocumentChat documentId={documentId} />
                    <VersionHistory />
                    <ShareDialog />
                    <Button>Guardar</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Editor</h2>
                    <div className="relative">
                        <MarkdownEditor value={content} onChange={setContent} />
                        <InlineComments />
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Vista previa</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none p-4 rounded-lg border bg-background">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
            </div>
        </div>
    )
}