import { useAddress, useMetamask } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (
    <div>
      {address ? (
        <p>Connected as {address}</p>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}
    </div>
  )
}

export default Home
