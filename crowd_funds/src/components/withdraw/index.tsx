import React from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { useWallet } from '@solana/wallet-adapter-react'

const WithdrawFunds = () => {
        const wallet = useWallet()
        const { getProgram } = useCluster()

        const withdrawingFunds = async() => {
            
        }

  return (
    <div>WithdrawFunds</div>
  )
}

export default WithdrawFunds