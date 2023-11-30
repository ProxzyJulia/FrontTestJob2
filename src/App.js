import './App.css';
import { WagmiConfig, createConfig, configureChains, mainnet,useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],[publicProvider()]);

  const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains })
      
    ],
    publicClient,
    webSocketPublicClient,
  })


const collection = '0xc3f733ca98e0dad0386979eb96fb1722a1a05e69'
const responseNft = await fetch(
  `https://api.reservoir.tools/tokens/v4?collection=${collection}&limit=1`
);






var objNFT = []
const tokId=0
if (responseNft.status === 200)
{
  objNFT = await responseNft.json();
}


 
export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
 
  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}
 
      {error && <div>{error.message}</div>}
    </div>
  )
}


function App() {
  return (
    
    <><WagmiConfig config={config}>

      <Profile />

    </WagmiConfig><><img src={objNFT.tokens[tokId].image} /><table>
      <tr>
        <td>NFT id</td><td>{objNFT.tokens[tokId].tokenId}</td>
      </tr>
      <tr>
        <td>NFT name</td><td>{objNFT.tokens[tokId].name}</td>
      </tr>
      <tr>
        <td>Collection name</td><td>{objNFT.tokens[tokId].collection.name}</td>
      </tr>
      <tr>
        <td>Rarity</td><td>{objNFT.tokens[tokId].rarity}</td>
      </tr>
      <tr>
        <td>Seller</td><td>{objNFT.tokens[tokId].source}</td>
      </tr>
      <tr>
        <td>Current owner</td><td>{objNFT.tokens[tokId].owner}</td>
      </tr>
      <tr>
        <td>Price</td><td>{objNFT.tokens[tokId].floorAskPrice}</td>
      </tr>
    </table></></>
    
  );
}

export default App;
