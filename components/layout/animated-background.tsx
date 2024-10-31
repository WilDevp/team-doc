'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
                animate={{
                    background: [
                        'linear-gradient(to bottom right, #e0f2fe, #f3e8ff, #fce7f3)',
                        'linear-gradient(to bottom right, #dbeafe, #ede9fe, #fef3c7)',
                        'linear-gradient(to bottom right, #e0f2fe, #f3e8ff, #fce7f3)',
                    ],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
            />
        </div>
    )
}