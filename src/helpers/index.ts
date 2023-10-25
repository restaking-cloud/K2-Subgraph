import { BigInt, BigDecimal } from "@graphprotocol/graph-ts/index";
import { Event, Claim } from "../../generated/schema";

export const ZERO = BigInt.fromI32(0)
export const ZERO_BIG_DECIMAL = BigDecimal.fromString("0.0")
export const ONE = BigInt.fromI32(1)
export const DEPOSIT_AMOUNT = BigInt.fromString('32000000000') //gwei
export const ONE_GWEI = BigInt.fromString('1000000000')
export const ONE_ETHER = BigInt.fromString('1000000000000000000')
export const ONE_ETHER_BIG_DECIMAL = BigDecimal.fromString('1000000000000000000.0')

export function emitEvent(
    tx: string,
    logIndex: string,
    from: string,
    blockNumber: BigInt,
    timestamp: BigInt,
    type: string,
    keys: string[],
    values: string[],
): void {
    let id = tx + "-" + logIndex
    let entity = new Event(id)
    entity.tx = tx
    entity.from = from
    entity.blockNumber = blockNumber
    entity.blockTimestamp = timestamp
    entity.type = type
    entity.keys = keys
    entity.values = values
    entity.save()
}

export function addNewClaims(
    amount: BigInt
): void {
    let claimEntity = Claim.load("0")
    if (!claimEntity) {
        claimEntity = new Claim("0");
        claimEntity.amount = BigInt.fromString("0");
    }
    claimEntity.amount = claimEntity.amount.plus(amount);
    claimEntity.save();
}
