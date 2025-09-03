import { useEffect, useState } from "react"
import * as anchor from "@coral-xyz/anchor"
import Image, { StaticImageData } from "next/image"
import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js'
import { useProgram } from "@/hooks";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy, Check } from "lucide-react"

interface ICampaignProps {
    title: string;
    description: string;
    target: string;
    img: StaticImageData;
    campaignPda: PublicKey;
    vaultPda: PublicKey;
    authority: PublicKey;
}

interface ICopy {
    [index: string]: boolean;
}

const CampaignCard = ({ title, description, img, campaignPda, vaultPda, authority, target }: ICampaignProps) => {
     const wallet = useWallet()
    const [donateAmount, setDonateAmount] = useState(0)
     const [getProgram] = useProgram()
    const [copied, setCopied] = useState<ICopy>({
        ['vault']: false,
        ['campaign']: false,
        ['authority']: false 
     })

     const [addresses, setAddresses] = useState([
        {
            text: "Vault",
            value: vaultPda.toString()
        },
        {
            text: "Campaign",
            value: campaignPda.toString()
        },
        {
            text: "Authority",
            value: authority.toString()
        },
     ])

    //  useEffect(() => {
     function handleCopy(field: string) {
         setCopied({ ...copied, [field]: true })

         setTimeout(() => {
            setCopied({ ...copied, [field]: false })
         }, 2000)

     }
    //  }, [copied])

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
        <div className="lg:min-w-[330px] min-w-[200px] lg:min-h-[200px] min-h-[200px] rounded-[15px] border-[1px] dark:border-[#8617e8] flex flex-col gap-[10px] overflow-hidden">
            {/* small banner */}
            <Image src={img} placeholder="blur" className="w-full h-[40%] object-cover cursor-pointer transition-[scale,500ms] hover:scale-[1.1]" alt="campaign-banner" />

            <article className="h-[50%] flex flex-col justify-center gap-[15px] w-full h-full bg-[#1d0131] dark:bg-[#8617e8] p-[1px]">
                <aside className="flex flex-col gap-[10px] bg-[#fff] dark:bg-[#000]  p-[20px] rounded-[10px] w-full">
                    <div className="flex flex-col gap-[5px]">
                        {/* campaign title */}
                        <h3 className="font-bold text-[clamp(14px,1vw,18px)]"> {title} </h3>
                        {/* campaign desc */}
                        <p> {description} </p>
                    </div>

                    <h4 className="text-[clamp(12px,1vw,14px)]"> <strong className="font-bold">Target:</strong> {target} <strong className="font-bold">Sol</strong> </h4>

                        {addresses.map((addr, idx) => (
                            <div key={idx} className="flex flex-col "> 
                                <strong className="font-bold"> {addr.text}: </strong> 
                                <div className="flex items-center gap-[5px]">
                                    <p className="text-[clamp(10px,1vw,12px)]"> {addr.value.substring(0, 10)}...{addr.value.substring(15, addr.value.length - 5)} </p>
                                        <CopyToClipboard text={addr.value}>
                                            {!copied[addr.text.toLowerCase()] ? <Copy className="w-[15px] cursor-pointer" onClick={() => handleCopy(addr.text.toLowerCase())} /> : <Check className="w-[15px] cursor-pointer" />}
                                        </CopyToClipboard>
                                </div>
                            </div>
                        )) }

                    <input 
                        onChange={(e) => setDonateAmount(Number(e.target.value))}
                        type="number" placeholder="enter an amount to donate" className="w-full p-[10px] border-[1px] dark:text-[#fff] text-[#000]  dark:placeholder-[#fff] placeholder-[#000] rounded-[10px]" />

                    {/* donate button */}
                    <button 
                        onClick={() => supportCampaign()}
                        className="py-[5px] bg-[#1d0131] dark:bg-[#fff] text-[#fff] dark:text-[#000] px-[10px] border-[1px] rounded-[15px] font-bold w-full"> Support </button>
                </aside>
            </article>
        </div>
    )
}

export default CampaignCard