# NestJS Zero to Hero - Modern Typescript Backend Applications.

## What is NestJS

- Open-source framework for building scalable Node server side applications built with full support for Typescript.
- Provides a level of abstraction above robust HTTP server frameworks (by default Nest uses Express). Even though Nest was built with Typescript in mind, it still exposes the original Express API and allows integration for Express-specific libraries.
- NestJS provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easy-to-maintain applications.

## System Requirements:

In order to run Nest, we need to [install Node onto your machine](https://nodejs.org/en/download/).

It's probably a good idea to install the NestJS CLI
 - `$ npm install -g @nestjs/cli`

## Tutorial Application Structure

This tutorial will build a task manager application, and the architecture will be as follows:

#### Modules

- AppModule (root)
	- TasksModule
		- TasksController
		- TasksService
		- Status ValidationPipe
		- TaskEntity
		- TaskRepository
		- ...
	- AuthModule
		- AuthController
		- AuthService
		-	UserEntity
		- UserRepository
		- JWT Strategy
		- ...

Will have communication between the two modules so users have Task ownership.

#### API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/tasks` | GET | Get tasks (incl. filters). |
| `/tasks/:id` | GET | Get a task. |
| `/tasks` | POST | Create a task. |
| `/tasks/:id` | DELETE | Delete a task. |
| `/tasks/:id/status` | PATCH | Update task status. |
| `/auth/signup` | POST | Sign up. |
| `/auth/signin` | POST | Sign in. |

___

## Sections

Use the links below to visit the notes for each step of the build:

- [Creating the REST API](./section2_rest_api.md)

## References

- https://www.udemy.com/course/nestjs-zero-to-hero/learn/lecture/15053816?components=buy_button%2Cdiscount_expiration%2Cgift_this_course%2Cpurchase%2Cdeal_badge%2Credeem_coupon#content