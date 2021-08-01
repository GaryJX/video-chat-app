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
      className={`px-4 py-2 text-white border border-teal-600 bg bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded ${className}`}
      {...props}
    >
      {children}
    </input>
  )
}

export default TextInput
