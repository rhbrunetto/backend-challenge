# Backend Challenge

This project uses [LoopBack](http://loopback.io).

## Run

### Manually

`npm install`

`node .`

### Docker

You probably know how to build and run a docker container.

## Documentation

This project has a **SWAGGER** documentation, you can access it at

[http://localhost:3000/explorer](http://localhost:3000/explorer)

## Login

You've to make an HTTP `POST` request to

[http://localhost:3000/v1/customers/login](http://localhost:3000/v1/customers/login)

with this JSON in the request body:
`
{
    "username": "mariasouza",
    "password": "senha123"
}
`