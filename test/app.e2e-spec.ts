import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('purchase happy path', () => {
    return request(app.getHttpServer())
      .post('/purchase')
      .send({
        id: '1a',
        value: 20
      })
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject({
          message: 'Purchase completed',
          user: {
            id: '1a',
            name: 'Ada Lovelace',
            balance: 80
          }
        })
      });
  });

  it('purchase wirh value bigger than balance', () => {
    return request(app.getHttpServer())
      .post('/purchase')
      .send({
        id: '1a',
        value: 120
      })
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject({
          message: 'Purchase completed',
          user: {
            id: '1a',
            name: 'Ada Lovelace',
            balance: -20
          }
        })
      });
  });

  it('purchase insuficient balance', () => {
    return request(app.getHttpServer())
      .post('/purchase')
      .send({
        id: '2b',
        value: 20
      })
      .expect(404)
      .then(response => {
        expect(response.body).toMatchObject({
          message: 'Insufficient balance'
        })
      });
  });

  it('purchase user not found', () => {
    return request(app.getHttpServer())
      .post('/purchase')
      .send({
        id: '3b',
        value: 20
      })
      .expect(404)
      .then(response => {
        expect(response.body).toMatchObject({
          message: 'User not found'
        })
      });
  });

  it('cashin with negative balance', () => {
    return request(app.getHttpServer())
      .post('/cashin')
      .send({
        id: '3c',
        value: 100
      })
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject({
          id: '3c',
            name: 'Grace Hooper',
            balance: 40
          
        })
      });
  });
});
