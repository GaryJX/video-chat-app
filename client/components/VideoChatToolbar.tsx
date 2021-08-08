import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import ThemeToggle from '@/components/common/ThemeToggle'
import { useToast } from '@chakra-ui/react'
import { FiClipboard } from 'react-icons/fi'

type VideoChatToolbarProps = {
  roomID: string
}

const VideoChatToolbar: React.FC<VideoChatToolbarProps> = ({ roomID }) => {
  const toast = useToast()

  const copyToClipboard = () => {
    toast({
      position: 'bottom-left',
      description: 'Copied Room ID to clipboard',
      status: 'success',
      duration: 2500,
    })
  }

  return (
    <div className="fixed flex items-center bottom-0 left-0 w-full px-10 py-3 z-50 bg-white dark:bg-gray-900">
      <div className="font-semibold flex items-center">
        Room {roomID}{' '}
        <CopyToClipboard text={roomID}>
          <button
            className="has-tooltip p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded text-teal-600"
            aria-label="Copy to clipboard"
            onClick={copyToClipboard}
          >
            <span className="tooltip rounded shadow-lg px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black whitespace-nowrap -top-9 transform -translate-x-1/2">
              Copy to Clipboard
            </span>
            <FiClipboard />
          </button>
        </CopyToClipboard>
      </div>
      <div className="ml-auto">
        <ThemeToggle align="right" />
      </div>
    </div>
  )
}

export default VideoChatToolbar
