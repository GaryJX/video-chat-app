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
        <title>Gary Xie | Software Developer</title>
        {/* <link rel="icon" href="/logo.svg" /> */}
        <meta
          name="viewport"
          content="height=device-height, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover, shrink-to-fit=no"
        />
        {/* // TODO: Add meta tags for better SEO, and maybe PWA eventually? */}
        {/* // TODO: Add Google Analytics for my production site to see how many users visit, and from what devices? */}
        {[400, 500, 600, 700].map((weight) => (
          <link
            key={weight}
            rel="preload"
            href={`/fonts/poppins-${weight}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </Head>
      <ChakraProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </ChakraProvider>
    </>
  )
}

export default App
