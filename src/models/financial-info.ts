export class User {
  uid!: number;
  password!: string;
  fname!: string;
  lname!: string;
  email!: string;
  pfURL!: string;
}

export class InvestmentAccount {
  aid!: number;
  accName!: string;
  accCategory!: string;
  accType!: string;
  value!: number;
  cash!: number;
}

export class BankingAccount {
  aid!: number;
  accName!: string;
  accCategory!: string;
  accType!: string;
  value!: number;
  interestRate!: number;
}

export class Investment {
  aid!: number;
  accName!: string;
  accType!: string;
  symbol!: string;
  instruName!: string;
  instruType!: string;
  currentPrice!: string;
  position!: number;
  avgPrice!: number;
}