import React from 'react'
import Link from 'next/link'

const Logo: React.FC = () => {
    return (
        <Link href="/" className="text-2xl font-bold text-primary hover:text-green-700 transition-colors">
            DotMD
        </Link>
    )
}

export default Logo
