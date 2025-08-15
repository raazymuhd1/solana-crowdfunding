use anchor_lang::prelude::*;

declare_id!("B3NunKwpNQ3MXQcK5DcPw89nwMdVhSCyN4a5qZsV2YMc");

#[program]
pub mod crowdfunds {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
