'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface ShareDialogProps {
    documentId: string
}

export function ShareDialog({ documentId }: ShareDialogProps) {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleShare = async () => {
        if (!email) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/documents/${documentId}/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            const data = await response.json()
            toast.success(`Documento compartido con ${email}`)
            setIsOpen(false)
            setEmail('')
        } catch (error) {
            console.error('Error sharing document:', error)
            toast.error(error.message || 'Error al compartir el documento')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Compartir documento</DialogTitle>
                    <DialogDescription>
                        Ingresa el correo electrónico de la persona con quien deseas compartir este documento.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleShare}
                        disabled={!email || isLoading}
                    >
                        {isLoading ? 'Compartiendo...' : 'Compartir'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}