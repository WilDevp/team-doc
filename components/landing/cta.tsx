import { Button } from '@/components/ui/button'

export function CTA() {
    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">¿Listo para mejorar la colaboración de tu equipo?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Únete a miles de equipos que ya están utilizando team-doc para crear documentos y roadmaps de manera eficiente.
                </p>
                <Button size="lg" variant="secondary">Comenzar ahora</Button>
            </div>
        </section>
    )
}