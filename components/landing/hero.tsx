import { Button } from '@/components/ui/button'

export function Hero() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6">Crea documentos y roadmaps en equipo</h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    team-doc te permite colaborar en tiempo real, crear documentos interactivos y planificar proyectos de manera eficiente.
                </p>
                <Button size="lg" className="mr-4">Comenzar gratis</Button>
                <Button size="lg" variant="outline">Ver demo</Button>
            </div>
        </section>
    )
}