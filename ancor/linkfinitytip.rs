use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount, Transfer};

// declare_id!(""); 

#[program]
mod linkfinity_donate {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        fee_percentage: u8,
        min_tip: u64,
        min_withdrawal_interval: i64,
    ) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.owner = ctx.accounts.owner.key();
        state.fee_percentage = fee_percentage;
        state.min_tip = min_tip;
        state.min_withdrawal_interval = min_withdrawal_interval;
        state.last_withdrawal_time = 0;
        state.allowed_tokens = vec![];
        Ok(())
    }

    pub fn set_allowed_token(
        ctx: Context<SetAllowedToken>,
        token: Pubkey,
        allowed: bool,
    ) -> Result<()> {
        let state = &mut ctx.accounts.state;

        require!(
            ctx.accounts.owner.key() == state.owner,
            CustomError::Unauthorized
        );

        if allowed {
            if !state.allowed_tokens.contains(&token) {
                state.allowed_tokens.push(token);
            }
        } else {
            state.allowed_tokens.retain(|&t| t != token);
        }
        Ok(())
    }

    pub fn set_fee(ctx: Context<SetFee>, fee_percentage: u8) -> Result<()> {
        let state = &mut ctx.accounts.state;

        require!(
            ctx.accounts.owner.key() == state.owner,
            CustomError::Unauthorized
        );

        state.fee_percentage = fee_percentage;

        Ok(())
    }

    #[warn(unused_variables)]
    pub fn send_tip_token(ctx: Context<SendTipToken>, amount: u64, _principal: String) -> Result<()> {

        let state = &ctx.accounts.state;

        // Validasi principal
        require!(!principal.trim().is_empty(), CustomError::PrincipalEmpty);

        require!(
            state
                .allowed_tokens
                .contains(&ctx.accounts.token_mint.key()),
            CustomError::TokenNotAllowed
        );

        require!(amount > 0, CustomError::AmountZero);
        require!(amount >= state.min_tip, CustomError::TipTooSmall);

        let fee = amount * state.fee_percentage as u64 / 100;
        let tip_amount = amount - fee;


        let cpi_accounts = Transfer {
            from: ctx.accounts.sender_token_account.to_account_info(),
            to: ctx.accounts.contract_token_account.to_account_info(),
            authority: ctx.accounts.sender.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info(); 
        token::transfer(CpiContext::new(cpi_program.clone(), cpi_accounts), amount)?; 

        let cpi_accounts_fee = Transfer {
            from: ctx.accounts.contract_token_account.to_account_info(),
            to: ctx.accounts.owner_token_account.to_account_info(),
            authority: ctx.accounts.state.to_account_info(),
        };
        token::transfer(CpiContext::new(cpi_program.clone(), cpi_accounts_fee), fee)?;


        let cpi_accounts_tip = Transfer {
            from: ctx.accounts.contract_token_account.to_account_info(),
            to: ctx.accounts.recipient_token_account.to_account_info(),
            authority: ctx.accounts.state.to_account_info(),
        };
        token::transfer(CpiContext::new(cpi_program.clone(), cpi_accounts_tip), tip_amount)?; 

        msg!(
            "{{\"action\": \"send_tip_token\", \"amount\": {}, \"fee\": {}, \"tip_amount\": {}, \"principal\": \"{}\", \"recipient\": \"{}\"}}",
            amount,
            fee,
            tip_amount,
            _principal,
            ctx.accounts.recipient_token_account.key()
        );


        Ok(())
    }

    pub fn withdraw_emergency(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let state = &mut ctx.accounts.state;


        let current_time = Clock::get()?.unix_timestamp;
        require!(
            current_time - state.last_withdrawal_time >= state.min_withdrawal_interval,
            CustomError::WithdrawTooSoon
        );

        state.last_withdrawal_time = current_time;


        require!(
            ctx.accounts.contract_token_account.amount >= amount,
            CustomError::InsufficientBalance
        );


        let cpi_accounts = Transfer {
            from: ctx.accounts.contract_token_account.to_account_info(),
            to: ctx.accounts.owner_token_account.to_account_info(),
            authority: ctx.accounts.state.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info(); 
        token::transfer(CpiContext::new(cpi_program.clone(), cpi_accounts), amount)?; 

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = owner, space = 8 + State::MAX_SIZE)]
    pub state: Account<'info, State>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetAllowedToken<'info> {
    #[account(mut, has_one = owner)]
    pub state: Account<'info, State>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct SendTipToken<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
    #[account(mut)]
    pub sender: Signer<'info>,
    #[account(mut)]
    pub sender_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub contract_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub recipient_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    
    pub owner_token_account: Account<'info, TokenAccount>,
    pub token_program: AccountInfo<'info>, 
    pub token_mint: Account<'info, Mint>,
}

#[derive(Accounts)]
pub struct SetFee<'info> {
    #[account(mut, has_one = owner)]
    pub state: Account<'info, State>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, has_one = owner)]
    pub state: Account<'info, State>,
    pub owner: Signer<'info>,
    #[account(mut)]
    pub contract_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub owner_token_account: Account<'info, TokenAccount>,
    pub token_program: AccountInfo<'info>, 
}

#[account]
pub struct State {
    pub owner: Pubkey,
    pub fee_percentage: u8,
    pub min_tip: u64,
    pub last_withdrawal_time: i64,
    pub min_withdrawal_interval: i64,
    pub allowed_tokens: Vec<Pubkey>,
}

impl State {
    pub const MAX_SIZE: usize = 32 + 1 + 8 + 8 + 8 + (32 * 10);
}

#[error_code]
pub enum CustomError {
    #[msg("Token not allowed")]
    TokenNotAllowed,
    #[msg("Principal Empty")]
    PrincipalEmpty,
    #[msg("Amount must be greater than zero")]
    AmountZero,
    #[msg("Tip amount too small")]
    TipTooSmall,
    #[msg("Insufficient balance")]
    InsufficientBalance,
    #[msg("Withdrawal too soon")]
    WithdrawTooSoon,
    #[msg("Unauthorized")]
    Unauthorized,
}
