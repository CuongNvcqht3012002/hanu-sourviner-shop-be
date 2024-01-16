## Installation

```bash
$ yarn install
```

## Running the app

```bash
# watch mode
$ yarn dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Run docker

```bash
$ yarn dc:prod
```

## URL

```bash
# Run app
$ yarn dev => http://localhost:3000

# Swagger
$ http://localhost:3000/swagger

```

To create migration:
yarn migration:generate -- src/database/migrations/CreateNameTable

* Remember: After any changes at entities, we need to run following commands to sync database
yarn schema:sync


## VPS Information
ssh root@103.200.20.78
4sq0efz5ygHujcZyHTkj