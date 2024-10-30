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

export function ShareDialog() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleShare = async () => {
        setIsLoading(true)
        // Aquí implementarías la lógica real de compartir
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        setEmail('')
    }

    return (
        <Dialog>
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