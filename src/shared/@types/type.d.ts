declare interface LogType {
  loser1_point: number;
  loser2: {
    name: string;
    id: string;
  };
  winner2: {
    name: string;
    id: string;
  };
  loser1: {
    name: string;
    id: string;
  };
  month: number;
  loser2_point: number;
  year: number;
  winner1_point: number;
  winner1: {
    name: string;
    id: string;
  };
  timeStamp: string;
  winner2_point: number;
  id: string;
}
declare interface playerType {
  name: string;
  lose: number;
  win: number;
  vs: {
    name: string;
    lose: number;
    win: number;
    id: string;
  }[];
  team: {
    lose: number;
    win: number;
    name: string;
    id: string;
  }[];
}
