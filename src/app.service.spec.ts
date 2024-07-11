import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('purchase succes', () => {
    const request = {
      id: '1a',
      value: 20
    }

    const response = service.purchase(request.id, request.value);
    expect(response).toMatchObject({
      message: 'Purchase completed',
      user: {
        id: '1a',
        name: 'Ada Lovelace',
        balance: 80
      }
    })
  });

  it('purchase insuficient balance', () => {
    const request = {
      id: '2b',
      value: 20
    }

    try {
      service.purchase(request.id, request.value);
    } catch (error) {
      expect(error.message).toBe('Insufficient balance');
    }
  })

  it('user not found', () => {
    const request = {
      id: '3b',
      value: 20
    }

    try {
      service.purchase(request.id, request.value);
    } catch (error) {
      expect(error.message).toBe('User not found');
    }
  })

  it('cashin success', () => {
    const request = {
      id: '1a',
      value: 20
    }

    const response = service.cashin(request.id, request.value);
    expect(response).toMatchObject({
      id: '1a',
      name: 'Ada Lovelace',
      balance: 120
    })
  });

  it('cashin with user not found', () => {
    const request = {
      id: '3c',
      value: 20
    }

    try {
      service.cashin(request.id, request.value);
    } catch (error) {
      expect(error.message).toBe('User not found');
    }
  });

  it('validate cashin ammount', () => {
    const value = 100
    const user = {
      id: '3c',
      name: 'Grace Hooper',
      balance: -50,
    }

    const response = service.validateCashIn(value, user);
    expect(response).toBe(40);
  })
});
