import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import ThemeToggle from '@/components/common/ThemeToggle'
import { useToast } from '@chakra-ui/react'
import { FiClipboard } from 'react-icons/fi'
import {
  FaDoorOpen,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa'

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
      duration: 1000,
    })
  }

  return (
    <div className="fixed grid grid-flow-col grid-cols-3 items-center bottom-0 left-0 w-full px-10 py-3 z-50 bg-white dark:bg-gray-900">
      <div className="font-semibold flex items-center">
        Room {roomID}{' '}
        <CopyToClipboard text={roomID}>
          <button
            className="has-tooltip p-3 ml-1 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded text-black dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
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
      <div className="flex justify-center gap-3">
        <button
          className="has-tooltip p-3 ml-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded text-red-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Mute/Unmute"
          // onClick={copyToClipboard}
        >
          <span className="tooltip rounded shadow-lg px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black whitespace-nowrap -top-9 transform -translate-x-1/2">
            Mute/Unmute
          </span>
          {/* <FaMicrophone /> */}
          <FaMicrophoneSlash />
        </button>
        <button
          className="has-tooltip p-3 ml-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded text-red-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Start/Stop Video"
          // onClick={copyToClipboard}
        >
          <span className="tooltip rounded shadow-lg px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black whitespace-nowrap -top-9 transform -translate-x-1/2">
            Start/Stop Video
          </span>
          <FaVideoSlash />
          {/* <FaVideo /> */}
        </button>
        <button
          className="has-tooltip p-3 ml-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded text-red-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Leave Room"
          // onClick={copyToClipboard}
        >
          <span className="tooltip rounded shadow-lg px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black whitespace-nowrap -top-9 transform -translate-x-1/2">
            Leave Room
          </span>
          <FaDoorOpen />
        </button>
      </div>
      <div className="flex justify-end">
        <ThemeToggle
          align="right"
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        />
      </div>
    </div>
  )
}

export default VideoChatToolbar
