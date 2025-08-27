# Project Description

**Deployed Frontend URL:** [TODO: Link to your deployed frontend]

**Solana Program ID:** [TODO: Your deployed program's public key]

## Project Overview

### Description
[TODO: Provide a comprehensive description of your dApp. Explain what it does. Be detailed about the core functionality.]

A simple crowdfunding dapp, that lets user tobe able to create a campaign and let other users to support the campaign by donating it. 

only the campaign authority that has the authority to withdraw the funds from the vault related to the campaign.

after the withdrawal, all related accounts (vault, campaign) will be deleted/removed, therefore it can no longer available on-chain.

### Key Features
[TODO: List the main features of your dApp. Be specific about what users can do.]

- Feature 1: Create a campaign
    each user with specific address only able to create one campaign

- Feature 2: Donate to campaign
    every user are able to support to any campaign by donating any amount of their SOL. 
- ...
  
### How to Use the dApp
[TODO: Provide step-by-step instructions for users to interact with your dApp]

1. **Connect Wallet**
    first thing first, connect your wallet before interacting with the dapp, and make sure your are connected to the `DEVNET` network, because the `programs` are currently deployed on the `DEVNET` network.

2. **Campaign Creation** 
   - go to the `/campaign` page
   - fill out all the required inputs
   - pay attention on the `title` and `description`, both of them have character length limitation, if you're facing some error when creating the campaign, make sure to check them out.
   - lastly, click the `create campaign` button, to send transactions.

    after the campaign creation, the popup will show up, and make to check them out.

    **NOTE: Make sure to save all the addresses of all the accounts after the campaign creation**

3. **Action 2:** 
    - go to the `homepage`, pick any campaign u want to support
    - after choosing the campaign, fill out the input amount your want to donate.
    - and click the `support` button to send transaction.

    **NOTE: you can't donate to unexisted campaign**
4.  **Action 3:** 

    - go to `/withdrawal` page, fill out all the required accounts/addresses on the inputs
    - refer back to the `step-2`, where you saved all the account addresses from the campaign creation. all of those accounts are needed in order to withdraw the funds from the `vault`.

    **NOTE**:
      - only the campaign authority that has authority to withdraw the funds from the `Vault`.
      - without all the required account addresses, no withdrawal can be made.

## Program Architecture
[TODO: Describe your Solana program's architecture. Explain the main instructions, account structures, and data flow.]

### PDA Usage
[TODO: Explain how you implemented Program Derived Addresses (PDAs) in your project. What seeds do you use and why?]

**PDAs Used:**
- PDA 1: [Purpose and description]
- PDA 2: [Purpose and description]

### Program Instructions
[TODO: List and describe all the instructions in your Solana program]

**Instructions Implemented:**
- Instruction 1: [Description of what it does]
- Instruction 2: [Description of what it does]
- ...

### Account Structure
[TODO: Describe your main account structures and their purposes]

```rust
// Example account structure (replace with your actual structs)
#[account]
pub struct YourAccountName {
    // Describe each field
}
```

## Testing

### Test Coverage
[TODO: Describe your testing approach and what scenarios you covered]

**Happy Path Tests:**
- Test 1: [Description]
- Test 2: [Description]
- ...

**Unhappy Path Tests:**
- Test 1: [Description of error scenario]
- Test 2: [Description of error scenario]
- ...

### Running Tests
```bash
# Commands to run your tests
anchor test
```

### Additional Notes for Evaluators

[TODO: Add any specific notes or context that would help evaluators understand your project better]