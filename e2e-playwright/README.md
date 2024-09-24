# Instructions for running the playwright-tests

## Start the application

From projects root-folder:
**command:**

`docker compose -f docker-compose.yml up --build`

### Run the tests from another terminal

From projects root-folder:
**command:**
`docker compose -f docker-compose.yml run --rm --entrypoint=npx playwright playwright test`

### Shutdown and remove the containers
**command:**
`docker compose -f docker-compose.yml down`
