import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

const LOCAL_STORAGE_THEME_KEY = 'theme'

type ThemeToggleProps = {
  align?: 'center' | 'right'
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ align = 'center' }) => {
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
      className="has-tooltip p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
    >
      <span
        className={`tooltip rounded shadow-lg px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black whitespace-nowrap -top-9`}
        style={{
          transform:
            align === 'center'
              ? 'translateX(-50%)'
              : 'translateX(calc(-100% + 1.25rem))',
        }}
      >
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </span>
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  )
}

export default ThemeToggle
