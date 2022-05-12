import { ethers } from "ethers"

async function main() {
   
   // @ts-ignore
   const provider = new ethers.providers.Web3Provider(window.ethereum)

   
   await provider.send("eth_requestAccounts", [])

   const signer = provider.getSigner()


   await provider.getBlockNumber()


   const balance = await provider.getBalance("ethers.eth")
   
   console.log(ethers.utils.formatEther(balance));
}

main()

