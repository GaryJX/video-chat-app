import React from 'react'

const Container: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col p-10 shadow-md rounded-md w-3/4 max-w-sm bg-white dark:bg-gray-700 relative">
      {children}
    </div>
  )
}

export default Container
