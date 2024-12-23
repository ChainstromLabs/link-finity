// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title LinkFinityDonate
 * @notice This contract allows users to send tips using Ether or ERC20 tokens to a recipient.
 *         It includes a fee deduction system and provides emergency withdrawal functions for the owner.
 * @dev This contract utilizes OpenZeppelin libraries for ERC20 token interaction, reentrancy protection, and access control.
 *       The contract owner can change the fee percentage, set minimum tip amounts, and allow/disallow specific tokens.
 *       It also supports emergency withdrawals with a cooldown period.
 */
contract LinkFinityDonate is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 public FEE_PERCENTAGE = 1;           // Percentage fee for tips
    uint256 public minWithdrawalInterval = 1 hours; // Minimum interval for emergency withdrawals
    uint256 public lastWithdrawalTime;              // Timestamp of last withdrawal
    uint256 public MIN_TIP = 0.01 ether;         // Minimum amount required for a tip

    mapping(address => bool) public allowedTokens;  // Mapping to track allowed tokens for tipping

    /**
     * @notice Event emitted when a tip is successfully sent.
     * @param sender The address of the sender.
     * @param recipient The address of the recipient.
     * @param amount The amount of the tip sent.
     * @param fee The fee deducted from the tip.
     * @param principal The principal identifier associated with the tip.
     */
    event TipSent(address indexed sender, address indexed recipient, uint256 amount, uint256 fee, bytes32 indexed principal);

    /**
     * @notice Event emitted when an emergency withdrawal is made by the owner.
     * @param owner The address of the owner.
     * @param amount The amount withdrawn.
     * @param reason The reason for the withdrawal.
     */
    event Withdrawal(address indexed owner, uint256 amount, string reason);

    /**
     * @notice Event emitted when a token is allowed or disallowed for tipping.
     * @param token The address of the token.
     * @param allowed A boolean indicating whether the token is allowed.
     */
    event TokenAllowed(address token, bool allowed);

    /**
     * @dev Modifier that checks if the token is allowed for tipping.
     * @param token The address of the token.
     */
    modifier onlyAllowedToken(address token) {
        require(allowedTokens[token], "Token not allowed");
        _;
    }

    /**
     * @notice Constructor to initialize the contract with the initial owner and some configurations.
     * @param initialOwner The address that will be the owner of the contract.
     * @dev The constructor sets an initial fee, minimum tip amount, and a minimum withdrawal interval.
     */
    constructor(address initialOwner) payable Ownable(initialOwner) {
        require(msg.value >= 0.1 ether, "Must send at least 0.1 ether");
    }

    /**
     * @notice Function to send an Ether tip to a recipient.
     * @param recipient The address to receive the tip.
     * @param _principal An identifier associated with the tip.
     * @dev The function deducts a fee and transfers the remaining amount to the recipient.
     */
    function sendTip(address payable recipient, bytes32 _principal) external payable nonReentrant {
        require(msg.value > 0, "Amount must be greater than zero");
        require(recipient != address(0), "Invalid recipient address");
        require(recipient != address(this), "Cannot tip the contract itself");
        require(msg.value >= MIN_TIP, "Tip amount too small");

        uint256 fee = (msg.value * FEE_PERCENTAGE) / 100;
        uint256 tipAmount = msg.value - fee;

        (bool feeSent, ) = owner().call{value: fee}("");
        require(feeSent, "Fee transfer failed");

        (bool tipSent, ) = recipient.call{value: tipAmount}("");
        require(tipSent, "Tip transfer failed");

        emit TipSent(msg.sender, recipient, tipAmount, fee, _principal);
    }

    /**
     * @notice Function to send an ERC20 token tip to a recipient.
     * @param token The address of the ERC20 token.
     * @param recipient The address to receive the token tip.
     * @param amount The amount of tokens to send.
     * @param _principal An identifier associated with the tip.
     * @dev The function checks allowance and transfers the specified amount of tokens to the recipient and owner.
     */
    function sendTipToken(address token, address recipient, uint256 amount, bytes32 _principal) external nonReentrant onlyAllowedToken(token) {
        require(token != address(0) && recipient != address(0), "Invalid addresses");
        require(amount > 0, "Amount must be greater than zero");
        require(recipient != address(this), "Cannot tip the contract itself");
        require(amount >= MIN_TIP, "Tip amount too small");

        IERC20 erc20 = IERC20(token);
        require(erc20.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");

        uint256 fee = (amount * FEE_PERCENTAGE) / 100;
        uint256 tipAmount = amount - fee;

        erc20.safeTransferFrom(msg.sender, address(this), amount);
        erc20.safeTransfer(owner(), fee);
        erc20.safeTransfer(recipient, tipAmount);

        emit TipSent(msg.sender, recipient, tipAmount, fee, _principal);
    }

    /**
     * @notice Emergency withdrawal function for the owner to withdraw Ether from the contract.
     * @param amount The amount to withdraw.
     * @param reason The reason for the emergency withdrawal.
     * @dev The function enforces a cooldown period between withdrawals to prevent abuse.
     */
    function withdrawEmergency(uint256 amount, string calldata reason) external onlyOwner nonReentrant {
        require(amount <= address(this).balance, "Insufficient balance");

        uint256 currentTime = block.timestamp;
        require(currentTime - lastWithdrawalTime >= minWithdrawalInterval, "Too soon to withdraw again");

        lastWithdrawalTime = currentTime;
        payable(msg.sender).transfer(amount);

        emit Withdrawal(msg.sender, amount, reason);
    }

    /**
     * @notice Emergency withdrawal function for the owner to withdraw ERC20 tokens from the contract.
     * @param token The address of the ERC20 token to withdraw.
     * @param amount The amount of tokens to withdraw.
     * @param reason The reason for the emergency withdrawal.
     * @dev The function checks if the contract has enough tokens and transfers them to the owner.
     */
    function withdrawTokenEmergency(address token, uint256 amount, string calldata reason) external onlyOwner nonReentrant {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than zero");

        IERC20 erc20 = IERC20(token);
        uint256 contractBalance = erc20.balanceOf(address(this));
        require(amount <= contractBalance, "Insufficient balance");

        require(erc20.transfer(msg.sender, amount), "Token transfer failed");

        emit Withdrawal(msg.sender, amount, reason);
    }

    /**
     * @notice Function to allow or disallow a token for tipping.
     * @param token The address of the ERC20 token.
     * @param allowed Boolean to set whether the token is allowed for tipping.
     * @dev The owner can use this function to manage which tokens can be used for tipping.
     */
    function setAllowedToken(address token, bool allowed) external onlyOwner {
        allowedTokens[token] = allowed;
        emit TokenAllowed(token, allowed);
    }

    /**
     * @notice Set the fee percentage for tips.
     * @param newFee The new fee percentage (between 0 and 5).
     * @dev The owner can use this function to adjust the fee for tips.
     */
    function setFee(uint256 newFee) external onlyOwner {
        require(newFee <= 5, "Fee percentage too high");
        require(newFee >= 0, "Fee cannot be negative");

        FEE_PERCENTAGE = newFee;
    }

    /**
     * @notice Set the minimum tip amount.
     * @param newMinTip The new minimum tip amount in ether.
     * @dev The owner can use this function to adjust the minimum tip value.
     */
    function setMinTip(uint256 newMinTip) external onlyOwner {
        require(newMinTip > 0, "Minimum tip must be greater than zero");
        MIN_TIP = newMinTip;
    }

    /**
     * @notice Fallback function to receive Ether.
     */
    receive() external payable {}
}
