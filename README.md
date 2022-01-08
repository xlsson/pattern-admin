[![Github Actions](https://github.com/xlsson/pattern-admin/actions/workflows/node.js.yml/badge.svg)](https://github.com/xlsson/pattern-admin/actions)
[![Scrutinizer Build](https://scrutinizer-ci.com/g/xlsson/pattern-admin/badges/build.png?b=main)](https://scrutinizer-ci.com/g/xlsson/pattern-admin/?branch=main)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/xlsson/pattern-admin/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/xlsson/pattern-admin/?branch=main)
[![Scrutinizer Code Coverage](https://scrutinizer-ci.com/g/xlsson/pattern-admin/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/xlsson/pattern-admin/?branch=main)

# E-scooter admin interface
(Part of a student project for the course Pattern at Blekinge Institute of Technology, BTH)

The admin interface is a tool for administrators to do administrative tasks and get an overview of the active system. Administrators can switch between showing data and perform tasks for the system as a whole, or for a specific city. Data is fetched from, and sent to, the [server](https://github.com/wadholm/pattern-backend) using a REST API.

## Installation

To run the app on your local system, you need the following:

This [server](https://github.com/wadholm/pattern-backend) running on `http://localhost:1337`. You need to register as an admin, and use those login details to log in to the admin interface.

Your system needs git, npm, node.js.

To install:

1. Clone the repo with `git clone https://github.com/xlsson/pattern-admin`
2. Run `npm install` to install the app and its dependencies.
3. Create a `devconfig.json` file in the `./src/functions/` folder, with the following content:
```
{
    "baseUrl": "http://localhost:1337/v1",
    "username": <admin username>,
    "password": <admin password>
}
```

4. Start the app in your browser by running `npm start`.
5. Point your browser to `http://localhost:3000`


## Available views

- A map with an overview of all e-scooters, charging stations and parking stations in the system/city.

- A list of all bikes in the system/city, with their current status.

- A list of all charging/maintenance stations in the system/city, with a map and a list of all e-scooters currently located at the station.

- A list of all parking stations in the system/city, with a map and a list of all e-scooters currently located at the station.

- An overview of all customers in the system, and a detailed view for each customer, including trip data.

- An overview of the price tariff currently in place for the system/city.

## Available tasks

- Edit customer data.

- Edit the price tariff.

- Request an e-scooter to be moved to a charging station in the city (effectively immediately moves the e-scooter to the station coordinates and sets battery level to 100, charge_id to the stations id and parking_id to null).
