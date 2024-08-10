import { IPrediction, ITransaction } from "../../modules/History/History";

export const predictionsMock: IPrediction[] = [
  {
    id: 1,
    side: "UP",
    result: "WIN",
    coef: 2,
    bet_amount: 20,
    result_amount: 40,
    date: "8:51 PM, 05/16/2024",
  },
  {
    id: 2,
    side: "UP",
    result: "WIN",
    coef: 1.6,
    bet_amount: 100,
    result_amount: 160,
    date: "8:51 PM, 05/16/2024",
  },
  {
    id: 10,
    side: "DOWN",
    result: "LOSE",
    coef: 1.8,
    bet_amount: 50,
    result_amount: -50,
    date: "8:51 PM, 05/16/2024",
  },
];

export const transactionsMock: ITransaction[] = [
  {
    type: "DEPOSIT",
    amount: 20,
    date: new Date(0),
    status: "???",
  },
  {
    type: "DEPOSIT",
    amount: 50,
    date: new Date(0),
    status: "???",
  },
  {
    type: "WITHDRAW",
    amount: 10,
    date: new Date(0),
    status: "???",
  },
];
