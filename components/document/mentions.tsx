'use client'

import { useState, useEffect, useRef } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface User {
    id: string
    name: string
    email: string
    image?: string
}

interface MentionsProps {
    onMention: (user: User) => void
}

export function Mentions({ onMention }: MentionsProps) {
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'Ana García',
            email: 'ana@example.com',
            image: '/placeholder.svg?height=32&width=32',
        },
        {
            id: '2',
            name: 'Carlos López',
            email: 'carlos@example.com',
            image: '/placeholder.svg?height=32&width=32',
        },
    ])
    const [search, setSearch] = useState('')

    const handleSelect = (user: User) => {
        onMention(user)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <span className="text-primary cursor-pointer">@</span>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Buscar usuario..." value={search} onValueChange={setSearch} />
                    <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
                    <CommandGroup>
                        {users.map((user) => (
                            <CommandItem
                                key={user.id}
                                value={user.name}
                                onSelect={() => handleSelect(user)}
                                className="flex items-center gap-2 p-2"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.image} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{user.name}</span>
                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}