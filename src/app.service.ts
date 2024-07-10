import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  private users = [
    {
      id: '1a',
      name: 'Ada Lovelace',
      balance: 100,
    },
  ];

  cashin = (id: string, value: number) => {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.balance += value;

    const index = this.users.findIndex((user) => user.id === id);
    const updatedUser = { ...user, balance: user.balance };
    this.users[index] = updatedUser;

    return user;
  };

  purchase = (id: string, value: number) => {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.balance <= 0) {
      throw new NotFoundException('Insufficient balance');
    }

    user.balance -= value;

    const index = this.users.findIndex((user) => user.id === id);
    const updatedUser = { ...user, balance: user.balance };
    this.users[index] = updatedUser;

    return { message: 'Purchase completed', user: this.users[index] };
  };
}
