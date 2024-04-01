# Express + Typescript Boilerplate

This is a bare-bones boilerplate app containing:

- [Express](https://expressjs.com) - with [Handlebars](https://handlebarsjs.com)
- [Typescript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io/docs/getting-started) - with
  [supertest](https://www.npmjs.com/package/supertest) for route testing
- [Prettier](https://prettier.io)
- [ESLint](https://eslint.org) - with the [Standard](https://github.com/standard/eslint-config-standard) configuration
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Dockerfile](https://www.docker.com)

# Commands

To start a development server:

    $ npm run dev

To run tests:

    $ npm run test

To build the Typescript source:

    $ npm run build

# Creating a Docker container

The Docker container will build your app and run it with minimal dependencies.

The first thing you'll need to do is create a `.env.production` file. You can
base it in your `.env.development` file. The `.env.production` file is
already being ignored by git, unless you manually changed the `.gitignore`
file.

Once you have a `.env.production` file, you can build a Docker image with:

    $ docker build -t my-app .

And run it with:

    $ docker run -p 3000:3000 my-app

The Dockerfile will take care of copying over the `public`, `views` and
`.env.production` files to your container, as well as the compiled Typescript
files.

When running as a Docker container, the port will be set to `3000`, you can
then map this to whatever port you need to expose.
