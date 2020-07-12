# SPA Challenge

## Install

You need docker-compose and docker installed.

1) Install and run the backend:

    ```sh
    cd backend
    docker-compose -f local.yml up
    ```

2) Set the custom google `API_KEY` in `backend/.envs/.local/.django`


3) Install and run the frontend:

    ```sh
    cd frontend
    docker-compose run --rm frontend install
    docker-compose up
    ```

## API

To geocode an address visit `http://localhost:3000/geocode/`
