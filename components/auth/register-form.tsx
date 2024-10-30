'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export function RegisterForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const confirmPassword = formData.get('confirmPassword')

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            setIsLoading(false)
            return
        }

        try {
            // Simular una llamada a la API
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Redirigir al dashboard después del registro exitoso
            router.push('/dashboard')
        } catch (error) {
            setError('Error al crear la cuenta. Por favor intenta de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Crear cuenta</CardTitle>
                <CardDescription>
                    Regístrate para comenzar a crear documentos y roadmaps
                </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="tu@ejemplo.com"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            disabled={isLoading}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/login" className="text-primary hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}