import React from 'react'

type TextInputProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const TextInput: React.FC<TextInputProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <input
      className={`px-4 py-2 appearance-none border border-teal-600 bg-white text-gray-700 placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${className}`}
      {...props}
    >
      {children}
    </input>
  )
}

export default TextInput
