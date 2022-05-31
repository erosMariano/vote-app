import { useAddress, useMetamask } from '@thirdweb-dev/react'
import type { NextPage } from 'next'


const Home: NextPage = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (
    <div>
      {/* {address ? (
        <p>Connected as {address}</p>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )} */}
      <p>Eros</p>
    </div>
  )
}

export default Home
