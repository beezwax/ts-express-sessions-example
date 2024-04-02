# Example Express + TypeScript + Mongo Authentication App

This app is an example for the blog post about Authentication and Security.

# Running the app

    $ docker compose up -d
    $ npm install && npm run dev

Docker is used to easily create a [MongoDB](https://www.mongodb.com) instance
to play with. You can also use [Mongo
Express](https://github.com/mongo-express/mongo-express) to browse the local
mongo at `http://localhost:8081` after running `docker compose up`.

The environment variables live in `.env.development`.
