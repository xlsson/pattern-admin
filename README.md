# E-scooter admin interface
(Part of a student project for the course Pattern at Blekinge Institute of Technology, BTH)

The admin interface is a tool for administrators to do administrative tasks and get an overview of the status quo. Administrators can switch between showing data and perform tasks for all cities in the system, or for a specific city. Data is fetched from, and sent to, the [server](https://github.com/wadholm/pattern-backend) using a REST API.



Available views:

- A map with an overview of all e-scooters, charging stations and parking stations in the system/city.

- A list of all bikes in the system/city, with their current status.

- A list of all charging/maintenance stations in the system/city, with a map and a list of all e-scooters currently located at the station.

- A list of all parking stations in the system/city, with a map and a list of all e-scooters currently located at the station.

- An overview of all customers in the system, and a detailed view for each customer, including trip data.

- An overview of the price tariff currently in place for the system/city.

Available tasks:

- Edit customer data.

- Edit the price tariff.

- Request an e-scooter to be moved to a charging station in the city.
