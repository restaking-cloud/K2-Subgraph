import { KETHDeposited, KETHWithdrawn, KETHClaimed, NodeOperatorDeposited, NodeOperatorWithdrawn, NodeOperatorClaimed, Slashed, Terminated, Liquidated, RepaidSlashAmount, Borrowed, IncreasedDebt } from "../generated/KSquaredLending/KSquaredLending";

import { addNewClaims, emitEvent } from "./helpers";

export function handleDeposit(event: KETHDeposited): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.Deposit',
        ['user', 'amount'],
        [
            event.params.depositor.toHexString(),
            event.params.amount.toString()
        ],
    );
}

export function handleWithdraw(event: KETHWithdrawn): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.Withdraw',
        ['user', 'amount'],
        [
            event.params.depositor.toHexString(),
            event.params.amount.toString()
        ],
    );
}

export function handleClaim(event: KETHClaimed): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.Claim',
        ['user', 'amount'],
        [
            event.params.depositor.toHexString(),
            event.params.amount.toString()
        ],
    );

    addNewClaims(event.params.amount);
}

export function handleNodeOperatorDeposit(event: NodeOperatorDeposited): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.NodeOperatorDeposit',
        ['operator', 'blsPublicKey', 'payoutRecipient'],
        [
            event.params.operator.toHexString(),
            event.params.blsPublicKey.toHexString(),
            event.params.payoutRecipient.toHexString()
        ],
    );
}

export function handleNodeOperatorWithdraw(event: NodeOperatorWithdrawn): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.NodeOperatorWithdraw',
        ['operator', 'blsPublicKey', 'kicked'],
        [
            event.params.operator.toHexString(),
            event.params.blsPublicKey.toHexString(),
            event.params.kicked.toString()
        ],
    );
}

export function handleNodeOperatorClaim(event: NodeOperatorClaimed): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.NodeOperatorClaim',
        ['operator', 'blsPublicKey', 'amount'],
        [
            event.params.blsPublicKey.toHexString(),
            event.params.payoutRecipient.toHexString(),
            event.params.amount.toString()
        ],
    );

    addNewClaims(event.params.amount);
}

export function handleSlash(event: Slashed): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.Slash',
        ['debtor', 'amount', 'recipient'],
        [
            event.params.debtor.toHexString(),
            event.params.amount.toString(),
            event.params.recipient.toHexString()
        ],
    );
}

export function handleTerminate(event: Terminated): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.Terminate',
        ['debtor'],
        [
            event.params.debtor.toHexString()
        ],
    );
}

export function handleLiquidated(event: Liquidated): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.Liquidate',
        ['debtor', 'liquidator', 'liquidationAmount'],
        [
            event.params.borrower.toHexString(),
            event.params.liquidator.toHexString(),
            event.params.liquidationAmount.toString(),
        ],
    );
}

export function handleTopUp(event: RepaidSlashAmount): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.TopUp',
        ['debtor', 'topupAmount'],
        [
            event.params.borrower.toHexString(),
            event.params.topupAmount.toString(),
        ],
    );
}

export function handleBorrow(event: Borrowed): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.Borrow',
        ['debtor', 'amount', 'designatedVerifier', 'maxSlashableAmountPerLiveness', 'maxSlashableAmountPerCorruption', 'interestPaid'],
        [
            event.params.borrower.toHexString(),
            event.params.amount.toString(),
            event.params.designatedVerifier.toHexString(),
            event.params.maxSlashableAmountPerLiveness.toString(),
            event.params.maxSlashableAmountPerCorruption.toString(),
            event.params.interestPaid.toString(),
        ],
    );
}

export function handleIncreaseDebt(event: IncreasedDebt): void {
    emitEvent(
        event.transaction.hash.toHexString(),
        event.logIndex.toString(),
        event.transaction.from.toHexString(),
        event.block.number,
        event.block.timestamp,
        'K2.IncreaseDebt',
        ['debtor', 'amount', 'designatedVerifier', 'maxSlashableAmountPerLiveness', 'maxSlashableAmountPerCorruption', 'resetDuration', 'interestPaid'],
        [
            event.params.borrower.toHexString(),
            event.params.amount.toString(),
            event.params.designatedVerifier.toHexString(),
            event.params.maxSlashableAmountPerLiveness.toString(),
            event.params.maxSlashableAmountPerCorruption.toString(),
            event.params.resetDuration.toString(),
            event.params.interestPaid.toString(),
        ],
    );
}
