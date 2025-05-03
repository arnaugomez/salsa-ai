- Ignore ESLint and Prettier errors that don't prevent the code from running.
- Even though the prompt will tell you to create different pages, all of them must be in the same route. Do not create multiple Next.js pages and routes, put everything in the same route.
- Use Shadcn components whenever possible. Install them with the CLI.

- name folders and file names in kebab-case.
- When you save and retrieve data from the database, use the same format.

# Architecture of the project

The project will follow a DDD & Hexagonal architecture design.

Each domain will be a folder inside the src directory. Inside a domain folder there will be 3 folders:

- data: connection with external APIs (HTTP, local storage, etc.)
  - services
  - view-models
  - repositories
- domain: business logic
  - entities (includes entities (typescript interfaces) and methods (as functions)). Each entity will have its own file.
  - usecases
- ui: components and pages
  - components
  - pages
  - hooks
- utils: utils

There will also be a shared folder with shared components and utils.

Do NOT use classes for entities, use cases, services. Instead, use Typescript interfaces and functions. To define class methods, create a function in the same file as the entity.
