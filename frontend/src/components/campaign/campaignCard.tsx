import { useState } from "react"
import * as anchor from "@coral-xyz/anchor"
import Image, { StaticImageData } from "next/image"
import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js'
import { CROWDFUNDS_IDL, CROWDFUNDS_ID } from "@/constants"
import { Idl } from "@coral-xyz/anchor";
import { useProgram } from "@/hooks";

interface ICampaignProps {
    title: string;
    description: string;
    target: number;
    img: StaticImageData;
    campaignPda: PublicKey;
    vaultPda: PublicKey;
    authority: PublicKey;
}

const CampaignCard = ({ title, description, img, campaignPda, vaultPda, authority, target }: ICampaignProps) => {
     const wallet = useWallet()
    const [donateAmount, setDonateAmount] = useState(0)
     const [getProgram] = useProgram()

    console.log(`vault key : ${vaultPda}`)


     /**
      * @dev donating to a campaign
      */
     const supportCampaign = async() => {

        if(!wallet.publicKey) {
            console.log("no wallet connected")
            return;
        }

        const vaultKey = typeof vaultPda == "string" ? new PublicKey(vaultPda) : vaultPda;
        const campaignKey = typeof campaignPda == "string" ? new PublicKey(campaignPda) : campaignPda;

        try {
            const crowdfunds = getProgram()
            const supprtingCampaignTx = await crowdfunds.methods.donateToCampaign(
               campaignPda,
               new anchor.BN(donateAmount * LAMPORTS_PER_SOL)
            ).accounts({
               donator: wallet.publicKey,
                vault: vaultKey,
                campaign: campaignKey,
               systemProgram: SystemProgram.programId
            }).rpc({ commitment: "confirmed" })
            
            crowdfunds.provider.connection.confirmTransaction(
                supprtingCampaignTx,
                "confirmed"
            )

            setDonateAmount(0)
            console.log("donate TX", supprtingCampaignTx)
        } catch (error) {
            console.log(`donating failed, something went wrong: ${error}`)
        }
     }

    return (
        <div className="min-w-[300px] min-h-[300px] rounded-[15px] border-[1px] border-[yellow] flex flex-col gap-[10px] overflow-hidden">
            {/* small banner */}
            <Image src={img} placeholder="blur" className="w-full h-[40%] object-cover cursor-pointer transition-[scale,500ms] hover:scale-[1.1]" alt="campaign-banner" />

            <article className="h-[50%] flex flex-col justify-center gap-[15px] w-full h-full bg-[yellow] p-[1px]">
                <aside className="flex flex-col gap-[10px] bg-[#000] p-[20px] rounded-[10px] w-full">
                    <div className="flex flex-col gap-[5px]">
                        {/* campaign title */}
                        <h3 className="font-bold"> {title} </h3>
                        {/* campaign desc */}
                        <p> {description} </p>
                    </div>

                    <h4 className="text-[clamp(12px,1vw,14px)]"> Target: {target} <strong className="font-bold">Sol</strong> </h4>

                    <h4 className="text-[clamp(12px,1vw,14px)]"> Vault Key: {vaultPda.toString()} </h4>

                    <input 
                        onChange={(e) => setDonateAmount(Number(e.target.value))}
                        type="number" placeholder="enter an amount to donate" className="w-full p-[10px] border-[1px] text-[#fff]  placeholder-[#fff] rounded-[10px]" />

                    {/* donate button */}
                    <button 
                        onClick={() => supportCampaign()}
                        className="py-[5px] bg-[#fff] text-[#000] px-[10px] border-[1px] rounded-[15px] font-bold w-full"> Support </button>
                </aside>
            </article>
        </div>
    )
}

export default CampaignCard