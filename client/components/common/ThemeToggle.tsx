import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

const LOCAL_STORAGE_THEME_KEY = 'theme'

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      // Update theme based on local storage if present, else use user preferences
      const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)

      if (localTheme) {
        if (localTheme === 'light' || localTheme === 'dark') {
          setTheme(localTheme)
        } else {
          localStorage.removeItem(LOCAL_STORAGE_THEME_KEY)
        }
      } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }
  }, [])

  useEffect(() => {
    if (theme === 'light') {
      document.querySelector('body')?.classList.remove('dark')
    } else {
      document.querySelector('body')?.classList.add('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  )
}

export default ThemeToggle
