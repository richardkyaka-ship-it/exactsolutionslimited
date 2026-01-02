'use client'

import React, { useEffect, useRef } from 'react'

interface FastButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onFastClick?: () => void
}

export default function FastButton({ onFastClick, children, className, ...props }: FastButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const button = buttonRef.current
        if (!button || !onFastClick) return

        const handleNativeClick = (e: MouseEvent) => {
            e.preventDefault()
            button.classList.add('active-tap')

            requestAnimationFrame(() => {
                onFastClick()
            })
        }

        button.addEventListener('click', handleNativeClick)
        return () => button.removeEventListener('click', handleNativeClick)
    }, [onFastClick])

    return (
        <button
            ref={buttonRef}
            className={`${className} touch-manipulation`}
            {...props}
        >
            {children}
        </button>
    )
}
