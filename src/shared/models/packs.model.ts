interface PlayerMap { [key: string]: GamePlayer; }

export interface IPackDef {
  packId: string;
  packName: string;
  blackCount: number;
  whiteCount: number;
}

export interface GamePlayer {
  guid: string;
  nickname: string;
  wins: number;
  whiteCards: number[];
  isSpectating: boolean;
  isRandom: boolean;
}

export interface GameItem {
  id: string;
  roundIndex: number;
  roundStarted: boolean;
  ownerGuid: string;
  chooserGuid: string | null;
  started: boolean;
  dateCreated: Date;
  public: boolean;
  players: PlayerMap;
  spectators: PlayerMap;
  blackCard: number;
  // key = player guid, value = white card ID
  roundCards: { [key: string]: number[] };
  playerOrder: string[];
  usedBlackCards: number[];
  usedWhiteCards: number[];
  revealIndex: number;
  lastWinner: {
    playerGuid: string;
    whiteCardIds: number[];
  } | undefined;
  settings: {
    password: string | null;
    roundsToWin: number;
    inviteLink: string | null;
    includedPacks: string[];
    includedCardcastPacks: string[];
  };
}

export interface IBlackCard {
  text: string;
  pick: number;
}

export type IWhiteCard = string;
