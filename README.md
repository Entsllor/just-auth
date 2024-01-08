# Express.js Auth Server Template

This is a template project for building an authentication server using Express.js, bun.sh, TypeORM, backend-batteries, and Vite.js. The server provides a solid foundation for implementing authentication features in your web applications.

## Features

- **Express.js**: A fast, minimalist web framework for Node.js.
- **Bun.sh**: A fast all-in-one JavaScript runtime.
- **TypeORM**: An Object-Relational Mapping (ORM) library for TypeScript and JavaScript.
- **Backend-Batteries**: A collection of useful backend utilities to enhance your development workflow.
- **Vite.js**: A fast validation package.

## Getting Started

### Prerequisites

Before you begin, make sure you have docker compose installed on your machine.
Also you should install bun.sh to start application in dev mode.

### Installation

```bash
git clone https://github.com/entsllor/just-auth.git
cd just-auth
```

### Running in production mode

To start the server in production mode, use the provided script:

```bash
cd scripts
. ./run_prod.sh
```

This will launch the authentication server using the configured production settings.

### Running in dev mode

To start the server in dev mode, use the provided script:

```bash
cd scripts
. ./scripts/run_dev.sh
```

## Project Structure

- `src`: Contains the source code for the authentication server.
- `scripts`: Includes useful scripts for managing the project.
- `infrastructure`: Includes docker files and configs.
- `tests`: Contains tests.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License
