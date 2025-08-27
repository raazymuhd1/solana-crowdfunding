# CrowdFunding Dapp

**Deployed Frontend URL:** [crowdfunding101](https://crowdfunding101.vercel.app/)

**Solana Program ID:** [crowdfundings101](https://solscan.io/account/HA1we1h6ChwUBu3R2iFsMrZcn8zY3roUmPFQ5aqmi4xS?cluster=devnet)

## Project Overview

### Description

A simple crowdfunding dapp, that lets user tobe able to create a campaign and let other users to support the campaign by donating it. 

only the campaign authority that has the authority to withdraw the funds from the vault related to the campaign.

after the withdrawal, all related accounts (vault, campaign) will be deleted/removed, therefore it can no longer available on-chain.

### Key Features

- `Feature 1`: Create a campaign
    each user with specific address only able to create one campaign

- `Feature 2`: Donate to campaign
    every user are able to support to any campaign by donating any amount of their SOL. 
- ...
  
### How to Use the dApp
1. **Connect Wallet**
    first thing first, connect your wallet before interacting with the dapp, and make sure your are connected to the `DEVNET` network, because the `programs` are currently deployed on the `DEVNET` network.

2. **Campaign Creation** 
   - go to the `/campaign` page
   - fill out all the required inputs
   - pay attention on the `title` and `description`, both of them have character length limitation, if you're facing some error when creating the campaign, make sure to check them out.
   - lastly, click the `create campaign` button, to send transactions.

    after the campaign creation, the popup will show up, and make to check them out.

    **NOTE: Make sure to save all the addresses of all the accounts after the campaign creation**

3. **Donate to campaign:** 
    - go to the `homepage`, pick any campaign u want to support
    - after choosing the campaign, fill out the input amount your want to donate.
    - and click the `support` button to send transaction.

    **NOTE: you can't donate to unexisted campaign**

4.  **Withdraw from the vault:** 

    - go to `/withdrawal` page, fill out all the required accounts/addresses on the inputs
    - refer back to the `step-2`, where you saved all the account addresses from the campaign creation. all of those accounts are needed in order to withdraw the funds from the `vault`.

    **NOTE**:
      - only the campaign authority that has authority to withdraw the funds from the `Vault`.
      - without all the required account addresses, no withdrawal can be made.

## Program Architecture
 
  **Brief Overview**
  a simple crowdfunds programs built for users to create a campaign, support, and withdraw from the vault that linked to the campaign.
 

### PDA Usage

**PDAs Used:**
- `campaign PDA`: 
    **PDA description**
     created with a combination of random seed, campaign author wallet address, and a campaign title

   **purpose**
    the purpose of doing that is to let a specific address to only able to create one campaign.

- `vault PDA`: 
    **PDA description**
    created with a combination of random seed, and a campaign author wallet address.

   **purpose**
    to linked the vault and the related campaign when initializing the campaign.

### Program Instructions
**Instructions Implemented:**
- `initialize_campaign`: 
    simply just creates the two important accounts (`vault` & `campaign`).

- `donate_to_campaign`: 
    simply just lets users to support the campaign by donating any amount of `SOL`

    this function will throw an error if the campaign didn't exists yet.

- `withdraw_from_campaign`: 
   As the name suggest, letting the campaign authority to withdraw the funds from the `Vault` that linked to the campaign.

### Account Structure

**Vault Account**
    an account to hold the campaign funds, see the structure below:

```rust
#[account]
#[derive(InitSpace)]
pub struct Vault {
    pub total_funds_raised: u64,
    pub campaign: Campaign,
    pub authority: Pubkey,
    pub campaign_pda: Pubkey
}

```

**Campaign Account**
  the account to hold all important properties for the campaign, see structure below: 

  ```rust
    #[account]
    #[derive(InitSpace)]
    pub struct Campaign {
    //    this len is not the string length, but the space needed to allocate in bytes for this string on this account
    #[max_len(30)]
    pub title: String,
    #[max_len(250)]
    pub description: String,
    pub raise_target: u64,
    pub campaign_author: Pubkey
    }  
  ```

## Testing

### Test Coverage

**Happy Path Tests:**
- `Successfull Campaign Initialization`: 
    purposedly created for a successfull or the correct way to create a campaign to not violate some limitations.
- `should successfully donate to campaign` 
  this test should be successfull to an existed campaign.
- `successfull withdraw` - should be successfull withdraw from the vault linked to the campaign by an authorized authority.

**Unhappy Path Tests:**
- `fail with long title`: should fail to initialize a campaign with long title.
- `fail with long description`: should fail to initialize with long description
- `should fail to donate to unexisted campaign`: should fail to donate to an unxisted campaign for safety reason to prevent user funds lost.
-`fail withdraw by an unthorized authority` - only an authorized authoriy that is allowed to withdraw from the vault.

### Running Tests
```bash
# Commands to run your tests
anchor test
```

### Additional Notes for Evaluators

**NOTE**: things need to pay attention:
 - please ensure that the `title` & `description` of the campaign didn't exceed the length limitations.
 - ensure that only donate to an existed campaign
 - only a campaign authority that can withdraw from the vault

 **FRONTEND NOTE**
  **Improvement** need some improvement
   as of now, I just saved the new campaign to the `localstorage`, therefore i only read the campaigns that has been saved on the `localstorage` to display it on the `homepage`.
   because of that, only the campaign creator that able to see the campaign lists on the `homepage`, since it's been saved to the `localstorage` on their browser. Hopefully there some understnding from the `Ackee's Team` :)

   **Reason** due too time limitations, i dont have much time to implement the on-chain data reading on the `homepage`