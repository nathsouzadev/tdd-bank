# Testing live

## Description

Project to show ways to implements tests in a live application

## Acceptance criteria

- User can do `purchase` if have positive ammount in account
- The `value` was discounte from `balance`
- If user not exists return a error

### New feature

- User can do one `purchase` if tha value was bigger than your balance
- If user has negativa balance, in new cash-in discount the value plus 20% of tax about the negative ammount
- The user can't do a purchase if has negative balance

### Input example

```
{
    id: '1a',
    value: 10
}
```

### Response example

```
/cashin

{
    id: '1a',
    name: 'Ada Lovelace',
    balance: 100
}

/purchase

{
    message: 'Purchase completed',
    user: {
        id: '1a',
        name: 'Ada Lovelace',
        balance: 100
        }
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Nathally Souza](https://kamilmysliwiec.com)
- Website - [https:/nathsouzadev.com.br](https:/nathsouzadev.com.br/)
- Twitter - [@nathsouzadev](https://twitter.com/nathsouzadev)
