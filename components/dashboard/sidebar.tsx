'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ScrollText, Layout, Settings, LogOut } from 'lucide-react'

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const navigation = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: Layout,
        },
        {
            name: 'Documentos',
            href: '/documents',
            icon: ScrollText,
        },
        {
            name: 'Configuración',
            href: '/settings',
            icon: Settings,
        },
    ]

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' })
    }

    return (
        <div className="w-64 border-r bg-background p-4 flex flex-col h-full">
            <div className="flex items-center mb-8">
                <h1 className="text-2xl font-bold">team-doc</h1>
            </div>
            <nav className="space-y-2 flex-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={isActive ? 'secondary' : 'ghost'}
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.name}
                            </Button>
                        </Link>
                    )
                })}
            </nav>
            <Button
                variant="ghost"
                className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
            >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
            </Button>
        </div>
    )
}