import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FileText, GitBranch, Users } from 'lucide-react'

const features = [
    {
        title: 'Documentos colaborativos',
        description: 'Crea y edita documentos en tiempo real con tu equipo.',
        icon: FileText,
    },
    {
        title: 'Roadmaps interactivos',
        description: 'Planifica y visualiza el progreso de tus proyectos.',
        icon: GitBranch,
    },
    {
        title: 'Gestión de equipos',
        description: 'Organiza y administra fácilmente los permisos de tu equipo.',
        icon: Users,
    },
]

export function Features() {
    return (
        <section id="features" className="py-20 bg-muted">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Características principales</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}