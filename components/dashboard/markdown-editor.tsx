'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
    Bold,
    Italic,
    List,
    Heading1,
    Heading2,
    Link as LinkIcon,
    Code,
    Quote,
} from 'lucide-react'

const toolbarItems = [
    {
        icon: Bold,
        action: '**',
        label: 'Negrita',
    },
    {
        icon: Italic,
        action: '_',
        label: 'Cursiva',
    },
    {
        icon: Heading1,
        action: '# ',
        label: 'Título 1',
        block: true,
    },
    {
        icon: Heading2,
        action: '## ',
        label: 'Título 2',
        block: true,
    },
    {
        icon: List,
        action: '- ',
        label: 'Lista',
        block: true,
    },
    {
        icon: Code,
        action: '`',
        label: 'Código',
    },
    {
        icon: Quote,
        action: '> ',
        label: 'Cita',
        block: true,
    },
]

export function MarkdownEditor({
                                   value,
                                   onChange,
                               }: {
    value: string
    onChange: (value: string) => void
}) {
    const [selection, setSelection] = useState<{ start: number; end: number }>({
        start: 0,
        end: 0,
    })

    const handleToolbarAction = (action: string, isBlock: boolean = false) => {
        const textarea = document.querySelector('textarea')
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value

        let newText
        if (isBlock) {
            // Para acciones de bloque, añadir al inicio de la línea
            const beforeSelection = text.slice(0, start)
            const selection = text.slice(start, end)
            const afterSelection = text.slice(end)

            newText = beforeSelection + action + selection + afterSelection
            onChange(newText)
        } else {
            // Para acciones inline, envolver el texto seleccionado
            const beforeSelection = text.slice(0, start)
            const selection = text.slice(start, end)
            const afterSelection = text.slice(end)

            newText = beforeSelection + action + selection + action + afterSelection
            onChange(newText)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2 bg-background border rounded-md p-2">
                {toolbarItems.map((item, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToolbarAction(item.action, item.block)}
                        title={item.label}
                    >
                        <item.icon className="h-4 w-4" />
                    </Button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="min-h-[500px] font-mono"
                        placeholder="Escribe tu documento en Markdown..."
                        onSelect={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            setSelection({
                                start: target.selectionStart,
                                end: target.selectionEnd,
                            })
                        }}
                    />
                </div>
                <div className="border rounded-md p-4 overflow-auto max-h-[500px]">
                    <ReactMarkdown>{value}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}