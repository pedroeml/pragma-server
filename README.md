![Node.js CI](https://github.com/pedroeml/pragma-server/workflows/Node.js%20CI/badge.svg)

# Pragma Brewery Server

This is a simple RESTful Node.js server built with NestJS for the Pragma Brewery Code Assignment.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="200" alt="Nest Logo" /></a>
</p>
  
<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# development watch-changes mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Code Assignment questions

> What are the highlights of your logic/code writing style?

I simply love the way how since Angular 2 you can modularize your project and export some injectable classes and make use of those anywhere else. Since NestJS is heavily inspired by Angular it accomplishes the same thing. I applied all that I did see fit at the moment related to design patterns on this project. Since this is a very simple service, I didn't see any need for some model classes, so no mappers were required. I was planning on including GraphQL on this solution, but since the responses of this service are considerably small and the front-end consumes all their data, I didn't see it would fit well. It would be a nice case of study though.

> What could you do better in your code next iteration?

The unit test coverage on each module's service folder isn't acceptable, so on next iteration I must work on it. One thing I don't feel satisfied with is the `ConfigurationModule` which in its current implementation only exports an URL for the sensor service. Since it's a very simple module, I think I could have used only a `dotenv` for that. I would like to persist the temperature range data on a database also. Another thing which would be awesome to do is to open the API of this project with Swagger. An E2E on this project would also be nice though.

> What were the questions you would ask and your own answers/assumptions?

For this service, the only question I'd ask is if the company tracks the containers by truck or by shipment. I mean, are the containers removed from the truck at some point to deliver the bottles? If so this service would need to have a `POST` and `DELETE` end-points to add and remove containers. Also, if that's the case then I'd probably need a `PUT`/`PATCH` end-point to update a container inside a truck to another type of beer so we can keep an eye on its temperature ranges.
