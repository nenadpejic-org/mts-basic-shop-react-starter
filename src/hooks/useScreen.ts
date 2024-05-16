import { useEffect, useState } from 'react'
import defaultTheme from 'tailwindcss/defaultTheme'

const DESKTOP_BREAKPOINT = Number(defaultTheme.screens.md.slice(0, -2))

const useScreen = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateSize = () => {
      const currentSize = window.innerWidth
      if (currentSize < DESKTOP_BREAKPOINT) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return { isMobile, isDesktop: !isMobile }
}

export default useScreen
