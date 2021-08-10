import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SocketProvider } from 'context/SocketContext'
import '@/styles/globals.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Video Chat App</title>
        <meta
          name="viewport"
          content="height=device-height, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover, shrink-to-fit=no"
        />
      </Head>
      <ChakraProvider>
        <SocketProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </SocketProvider>
      </ChakraProvider>
    </>
  )
}

export default App
