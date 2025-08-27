import { PublicKey } from "@solana/web3.js"

export type CampaignDetails = {
    id: number;
    title: string;
    description: string;
    raiseTarget: number;
    authority: string;
}

export interface CampaignLists {
    campaignPda: PublicKey;
    vaultPda: PublicKey;
    campaignDetails: CampaignDetails
}

export interface CampaignType {
    title: string;
    description: string;
    raiseTarget: number;
    campaignAuthor: PublicKey 
}


// create a campaign 
//      ->  save to localstorage 
//              -> retrieve campaigns from localstorage on campaign list