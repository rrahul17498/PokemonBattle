

enum BattleStatus {
    CREATED = "CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

type BattleAttack = {
    id: number,
    name: string,
    sourcePokemon: number,
    sourceUser: number,
    targetPokemon: number,
    targetUser: number
}


export type Battle = {
    id: number,
    status: BattleStatus,
    firstPlayerId: number,
    firstPlayerPokemon: number,
    secondPlayerId:  number,
    secondPlayerPokemon: number,
    currentTurn: number,
    battleAttacksLog: BattleAttack[],
    winner: number,
}