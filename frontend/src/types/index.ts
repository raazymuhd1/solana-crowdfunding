import { PublicKey } from "@solana/web3.js"

export type CampaignDetails = {
    title: string;
    description: string;
    raiseTarget: number;
    authority: string;
}

export interface CampaignLists {
    campaignPda: PublicKey;
    vaultPda: PublicKey;
    campaign: CampaignType
}

export interface CampaignType {
    title: string;
    description: string;
    raiseTarget: number;
    campaignAuthor: PublicKey 
}

export interface VaultType {
    authority: PublicKey;
    campaign: CampaignType;
}
// create a campaign 
//      ->  save to localstorage 
//              -> retrieve campaigns from localstorage on campaign list