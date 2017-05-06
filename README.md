# Wiki Map
## Project Description

A simple site that makes use of the Leaflet map API to allow users to collaboratively create and view lists of places.

## Usage

1. Create a `.env` file with database settings
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
5. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
