import { bg1, bg2, bg3, bg4 } from "@/assets";
import programIdl from "@/idl/crowdfunds.json"
import { PublicKey } from "@solana/web3.js";

const CROWDFUNDS_ID = new PublicKey('HA1we1h6ChwUBu3R2iFsMrZcn8zY3roUmPFQ5aqmi4xS')
const CROWDFUNDS_IDL = programIdl;

const dummyCampaigns = [
    { id: 0, title: "Clean Water", desc: "providing free clean water to the kids", img: bg1 },
    { id: 1, title: "New Clothes for orphans", desc: "providing a new clothes for an orphans", img: bg2 },
    { id: 2, title: "Humanitarian Aid for kids", desc: "supplying a humanitarian aid for kids out there", img: bg3 },
    { id: 3, title: "Help cancer", desc: "Helping a cancer survivor", img: bg4 },
]

export { dummyCampaigns, CROWDFUNDS_ID, CROWDFUNDS_IDL }