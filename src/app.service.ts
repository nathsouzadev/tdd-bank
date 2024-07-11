import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  private users = [
    {
      id: '1a',
      name: 'Ada Lovelace',
      balance: 100,
    },
    {
      id: '2b',
      name: 'Alan Turing',
      balance: 0,
    },
    {
      id: '3c',
      name: 'Grace Hooper',
      balance: -50,
    },
  ];

  cashin = (id: string, value: number) => {
    const user = this.validateUser(id);
    const ammount = this.validateCashIn(value, user);

    ammount === value ? (user.balance += value) : (user.balance = ammount);

    const index = this.users.findIndex((user) => user.id === id);
    const updatedUser = { ...user, balance: user.balance };
    this.users[index] = updatedUser;

    return user;
  };

  validateCashIn = (value, user) => {
    if (user.balance < 0) {
      const ammount = user.balance + value + user.balance * 0.2;
      return ammount;
    }

    return value;
  };

  validateUser = (id: string) => {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  };

  validateBalance = (user) => {
    if (user.balance <= 0) {
      throw new NotFoundException('Insufficient balance');
    }
  };

  purchase = (id: string, value: number) => {
    const user = this.validateUser(id);
    this.validateBalance(user);

    user.balance -= value;

    const index = this.users.findIndex((user) => user.id === id);
    const updatedUser = { ...user, balance: user.balance };
    this.users[index] = updatedUser;

    return { message: 'Purchase completed', user: this.users[index] };
  };
}
