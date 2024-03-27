# Express.js Auth Server Template

This is a template project for building an authentication server using Express.js, bun.sh, TypeORM, backend-batteries,
and Vite.js. The server provides a solid foundation for implementing authentication features in your web applications.

## Features

- **Express.js**: A fast, minimalist web framework for Node.js.
- **Bun.sh**: A fast all-in-one JavaScript runtime.
- **TypeORM**: An Object-Relational Mapping (ORM) library for TypeScript and JavaScript.
- **Backend-Batteries**: A collection of useful backend utilities to enhance your development workflow.
- **Vite.js**: A fast validation package.

## Getting Started

### Prerequisites

Before you begin, make sure you have docker compose installed on your machine.
Also, you should install bun.sh (version 1.0.30 or higher) to start application in dev mode.

### Installation

```bash
git clone https://github.com/entsllor/just-auth.git
cd just-auth
```

### Running in production mode

To start the server in production mode, use the provided script:

```bash
cd scripts
source ./run-prod.sh
```

This will launch the authentication server using the configured production settings.

### Running in dev mode

To start the server in dev mode, use the provided script:

```bash
cd scripts
source ./scripts/run-dev.sh
```

### Setting up RSA

* Generate keys

```bash
source .scripts/generate-auth-keys.sh
```

* Set algorithm type in .env

```dotenv
# in .env
APP_JWT_ALGORITHM=RS256
```

During initialization, the application will read the secret keys from the virtual environment. 
If the keys are not specified, they will be read from the files `keys/auth/jwt.key` and `keys/auth/jwt.key.pub`.

While using docker compose you can pass secret keys via env_file, environment or volumes

## Project Structure

- `src`: Contains the source code for the authentication server.
- `scripts`: Includes useful scripts for managing the project.
- `infrastructure`: Includes docker files and nginx configs.
- `tests`: Contains tests.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License
