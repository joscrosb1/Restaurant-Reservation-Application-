# Restaurant-Reservation-App


A full-stack restaurant reservation management application designed for restaurant owners and employees. It enables users to easily create, view, and edit reservations while also managing table seating settings.

## Live Project

- [Front-End Deployment](https://restaurant-reservation-app-frontend-2akq.onrender.com)
- [Back-End Deployment](https://restaurant-reservation-app-backend-m3o9.onrender.com)

## Technology Used

**Frontend:**

- JavaScript
- React
- React Router
- HTML
- CSS
- Bootstrap

**Backend:**

- Node.js
- Express
- Knex
- PostgreSQL

## Frontend Overview

### Dashboard View
<img width="949" alt="dash" src="https://github.com/joscrosb1/Restaurant-Reservation-App/assets/116053884/24364203-5a2d-48b1-bfe7-93d54c3efd54">

### Create a New Reservation
<img width="960" alt="create" src="https://github.com/joscrosb1/Restaurant-Reservation-App/assets/116053884/7779d86b-595b-46c1-9b7b-d17041ba918d">

### Create a New Table
<img width="960" alt="Screenshot 2023-07-26 061529" src="https://github.com/joscrosb1/Restaurant-Reservation-App/assets/116053884/c817e3b1-4c26-4559-95e1-86251ac71a0b">

### Seat a Reservation
<img width="960" alt="seat" src="https://github.com/joscrosb1/Restaurant-Reservation-App/assets/116053884/f9c24002-fb00-491d-a11c-e79b4489879d">

### Find a Reservation
<img width="960" alt="search" src="https://github.com/joscrosb1/Restaurant-Reservation-App/assets/116053884/8bd2c832-5541-45c6-a814-355ecf3350f8">




## Backend Overview

The API allows for the following routes:

# Tables Route

| Method      | Route                   |  Description                                        |
|-------------|-------------------------| ----------------------------------------------------|
| POST        |  /tables               | Creates a new table                                 |
| GET         |  /tables               | Lists all tables                                    |
| GET         |  /tables/:table_id     | Retrieves a specific table by its `table_id`        |
| PUT         |  /tables/:table_id/seat| Updates a specific table's `seat` by its `table_id` |
| DELETE      |  /tables/:table_id/seat| Deletes a specific table's `seat` by its `table_id` |


# Reservation Route

| Method | Route                            | Description                                      |
| ------ | -------------------------------- | ------------------------------------------------ |
| GET    | /reservations                    | List all reservations for the current date        |
| GET    | /reservations?date=YYYY-MM-DD    | List all reservations for the specified date      |
| POST   | /reservations                    | Create a new reservation                           |
| GET    | /reservations/:reservation_id    | List a reservation by ID                           |
| PUT    | /reservations/:reservation_id    | Update a reservation                               |
| PUT    | /reservations/:reservation_id/status | Update reservation status                         |
                

## Installation

1. Clone this repository: `git clone https://github.com/joscrosb1/Restaurant-Reservation-App.git`.
2. Navigate to the project directory using `cd Restaurant-Reservation-App`.
3. Run `cp ./back-end/.env.sample ./back-end/.env`.
4. Update the `./back-end/.env` file with the connection URLs to your database instance.
5. Run `cp ./front-end/.env.sample ./front-end/.env`. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
6. Run `npm install` to install project dependencies.
7. Run `npm run start:dev` to start your server in development mode.

## Running Tests

This project includes a set of tests that can be run using the command line. To run the tests, use the command `npm test`.

## User Stories

- **US-01 Create and list reservations:** As a restaurant manager, I want to create a new reservation when a customer calls, so that I know how many customers will arrive at the restaurant on a given day.

- **US-02 Create reservation on a future, working date:** As a restaurant manager, I only want to allow reservations to be created on a day when we are open, so that users do not accidentally create a reservation for days when we are closed.

- **US-03 Create reservation within eligible timeframe:** As a restaurant manager, I only want to allow reservations to be created during business hours, up to 60 minutes before closing, so that users do not accidentally create a reservation for a time we cannot accommodate.

- **US-04 Seat reservation:** As a restaurant manager, when a customer with an existing reservation arrives at the restaurant, I want to seat (assign) their reservation to a specific table, so that I know which tables are occupied and free.

- **US-05 Finish an occupied table:** As a restaurant manager, I want to free up an occupied table when the guests leave, so that I can seat new guests at that table.

- **US-06 Reservation Status:** As a restaurant manager, I want a reservation to have a status of either booked, seated, or finished, so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

- **US-07 Search for a reservation by phone number:** As a restaurant manager, I want to search for a reservation by phone number (partial or complete), so that I can quickly access a customer's reservation when they call about their reservation.

- **US-08 Change an existing reservation:** As a restaurant manager, I want to be able to modify a reservation if a customer calls to change or cancel their reservation, so that reservations are accurate and current.

## Author

This project was created by Joshua Crosby in association with Thinkful.
