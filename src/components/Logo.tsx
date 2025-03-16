import React from 'react'
import Link from 'next/link'

interface LogoProps {
    classname?: string
}

const Logo: React.FC<LogoProps> = ({classname}) => {
    return (
        <Link href="/"
              className={`text-2xl font-bold text-primary hover:text-green-700 transition-colors ${classname}`}
        >
            DotMD
        </Link>
    )
}

export default Logo
