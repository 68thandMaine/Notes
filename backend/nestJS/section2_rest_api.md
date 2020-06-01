# REST API

The first step of creating the backend is making the REST API. Having clearly defined endpoints will help in designing the rest of the server code.

| Section | Title |
|---|---|
| I. | [Create the Project Scaffolding](#create-the-project-scaffolding) |
| II. | [NestJS Modules](#nestjs-modules) |
| III. | [NestJS Controllers](#nestjs-controllers) |
| IV. | [NestJS Services and Providers](#nestjs-services-and-providers) |
| V. | [Retrieving Tasks](#retrieving-tasks) |
| VI. | [NestJS Models](#nestjs-models) |

___

## Create the Project Scaffolding

Begin by using the CLI to create a NestJS project:

> `nest new [project name]`

This command scaffolds a server for you, but not all of the files are required.

### Delete the following files

- `src/app.controller.spec.ts`
- `src/app.controller.ts`
- `src/app.service.ts`

### Modify the following file

- `src/app.module.ts`
  - Remove references to the controller and service files that were deleted in the above step.  

___

## NestJS Modules

Modules are importable chunks of code that group together a closely related set of capabilities. It is a good practice to have one folder per module with each folder containing the module's components. As modules are singletons, you can import modules into one another like React components.

Modules help nest organize the application structure via decorators.

### `@Module` Decorator Properties

| Property | Purpose |
|---|---|
| [`providers`](#nestjs-services-and-providers) | Array of providers to be available within the module via dependency injection. |
| [`controllers`](#nestjs-controllers) | Array of controllers to be instantiated within the module
| `exports` | Array of providers to export to other modules. |
| `imports` | List of modules required by this module ANy exported provider by these modules will be available in our module via dependency injection. |

Since modules are singletons and can be imported into one another, it is best to design each module to be as independent of others as possible. **It is extremely useful to create a diagram of how each module within the application will interact with other modules.**

#### FormModule Example

- Form Module
  - Post Module
		- User Profile Module
	- Comment Module
		- User Profile Module
	- Auth Module

Note that the post module and the comment module use the same user profile module.

### Creating the Tasks Module

Use the CLI to create your first module

> `nest g module [module name]`

This command will update the `app.module.ts` to include the newly created module in it's import array.

___

## NestJS Controllers

Controllers are defined with the `@Controller` decorator which accepts a string. The string is the **path** that is handled by the controller.

```JavaScript
@Controller('/tasks')
export class TasksController {
// ...
}
```

### Define Handlers

Handlers are methods within the controller class which correlate to the HTTP request type. They are demarcated with the following:

- `@Get()`
- `@Post()`
- `@Delete()`

Remember that these are **decorators** and should have the actual controller function defined beneath the decorator.

```JavaScript
@Get()
getAllTasks() {
 return ...;
}
```

### HTTP Request Flow

- Incoming request is routed to the controller:
  - NestJS parses the data and is then available to the handler
- Handler handles the request:
  - Performs operations such as communicate with a service.
- Handler returns the response value:
  - NestJS raps the returned value as a HTTP response.

### Creating the Tasks Controller

To create a controller, use the CLI

> `nest g controller [controller name] --no-spec`

Note the that the `--no-spec` flag is optional. Probably should include it for TDD.

This command generates a boilerplate controller file, and imports the file to the corresponding module.

___

## NestJS Services and Providers

Providers can be injected into the constructor of a module via dependency injection if they are decorated with the `@Injectable`, but they must be defined in the providers array of a module.

Services are defined as provider; however, not all providers are services. If a provider is wrapped with the `@Injectable()`  decorator and provided to a module, it acts as a single source of truth for the service. The main purpose of these services is business logic.

### Dependency Injection in NestJS

Dependencies are defined in the constructor of a class. NestJS takes care of the injection for us though, so no code needs to be written for it - it becomes available as a class property.

```JavaScript
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
 constructor(private tasksService: TasksService) {}
 // ... some code. Can use this.tasksService to access methods in the service.
}
```

### Creating the Tasks Service

As services an "talk" to databases, this is where our querying language would reside. To create a service using the CLI use the following command:

> `nestjs g service [service name] --no-spec`

This creates the service class, and imports it to the corresponding providers array. After the service is created you need to build the constructor for the corresponding controller to inject the service into. See the `TasksController` above for an example of this. 
___

## Retrieving Tasks

Begin building within the service. As our backend needs to access data storage, this is where we will communicate with a DB / in memory array.

```JavaScript

@Injectable()
export class TasksService {
 constructor(private tasksService: TasksService) {}
 private tasks = [];

 @Get()
 getAllTasks() {}
}
```

Create the appropriate handlers and access the methods from within the service which correspond to the handler.

The controller should only return business logic, or pass data from services to each other. This allows for clear separation of concerns by keeping business logic in the service files.

___

## NestJS Models

Since NestJS suggests keeping all relevant files together, the model for each module should reside within the folder.

Start with a Typescript interface.

```Typescript
export interface Task {
 id: string;
 title: string;
 description: string
 status: TaskStatus
}

export enum TaskStatus {
 OPEN="OPEN",
 IN_PROGRESS="IN_PROGRESS",
 DONE="DONE",
}
```

We can now apply these to TypeScript definitions throughout the module.

### Update Service and Controller Files

Basically anywhere that uses a model that is defined in our module needs to have the Typescript type definition attached to the variable name. Below is an example of how this is done:  

```TypeScript
import { Injectable } from '@nextjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
 private tasks: Task[] = [];

}
```

> Note the Typescript `private tasks: Task[]` typing.

### Add a create method

Obviously we need to create the methods which will allow us to get, create, update, and delete entries in our storage. Below is an example of how to create a TypeScript method in a service file:

```TypeScript
createTask(title: string, description: string) {
 const task: Task = {
 title,
 description,
 // ... other properties that can be found in the corresponding Model
 }
}
```
