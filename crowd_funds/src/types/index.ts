import { PublicKey } from "@solana/web3.js"

export type CampaignDetails = {
    title: string;
    description: string;
    raiseTarget: number;
}

export interface CampaignLists {
    campaignPda: PublicKey;
    vaultPda: PublicKey;
}

export interface CampaignType {
    title: string;
    description: string;
    raiseTarget: number;
    campaignAuthor: PublicKey 
}

