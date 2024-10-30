'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export function LoginForm() {
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

        // Aquí implementarías la lógica real de autenticación
        try {
            // Simular una llamada a la API
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Redirigir al dashboard después del login exitoso
            router.push('/dashboard')
        } catch (error) {
            setError('Credenciales inválidas. Por favor intenta de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Iniciar sesión</CardTitle>
                <CardDescription>
                    Ingresa a tu cuenta para acceder a tus documentos y roadmaps
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
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                        ¿No tienes una cuenta?{' '}
                        <Link href="/register" className="text-primary hover:underline">
                            Regístrate
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}