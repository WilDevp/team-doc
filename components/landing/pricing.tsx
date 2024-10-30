import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

const plans = [
    {
        name: 'Básico',
        price: '9.99',
        features: ['5 usuarios', '10 GB de almacenamiento', 'Soporte por email'],
    },
    {
        name: 'Pro',
        price: '19.99',
        features: ['Usuarios ilimitados', '100 GB de almacenamiento', 'Soporte prioritario'],
    },
    {
        name: 'Empresa',
        price: 'Contactar',
        features: ['Personalizado', 'Almacenamiento ilimitado', 'Soporte dedicado'],
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-20 bg-background">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Planes y precios</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <Card key={index} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>
                                    {plan.price === 'Contactar' ? plan.price : `$${plan.price}/mes`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="list-disc list-inside space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">{plan.price === 'Contactar' ? 'Contactar ventas' : 'Elegir plan'}</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}