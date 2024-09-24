### Before running the application:

1. From `programming-ui`-folder download the dependencies by running the command:
`npm install`

2. From `grader-image`-folder build the docker image by running the command:
`docker build -t grader-image .`

### Running the production build:

## Starting the app:
From the root-folder of the project the app is started as a daemon with the production configuration by running the command:
`docker compose -f docker-compose.prod.yml up -d`

## Shutdown:
docker compose down

### Running the end-to-end playwright tests:
The end-to-end playwright tests can be found in `/e2e-playwright/tests` -folder

1. From the root-folder of the project the app is started with the dev configuration by running the command:
`docker compose -f docker-compose.yml up`

2. Run the tests with a command:
`docker compose -f docker-compose.yml run --rm --entrypoint=npx playwright playwright test`

3. Shutdown: 
`docker compose -f docker-compose.yml down`

### Running the k6 performance tests:

With k6 installed and the application running, tests can by found from the `k6`-folder.
Tests are run with the command:
`k6 run [testfilename]`


