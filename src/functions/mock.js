// Mock data to enable development without a server

const data = {
    bike: [
        {
            _id: 1,
            city_id: 1,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 20,
            maintenance: "",
            coordinates: [56.183013, 15.573461]
        },
        {
            _id: 2,
            city_id: 1,
            charge_id: 0,
            parking_id: 1,
            bike_status: "free",
            battery_status: 30,
            maintenance: "",
            coordinates: [56.185000, 15.603461]
        },
        {
            _id: 3,
            city_id: 1,
            charge_id: 0,
            parking_id: 1,
            bike_status: "free",
            battery_status: 70,
            maintenance: "",
            coordinates: [56.165000, 15.613461]
        },
        {
            _id: 4,
            city_id: 2,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 1,
            maintenance: "",
            coordinates: [59.385921, 13.490531]
        },
        {
            _id: 5,
            city_id: 1,
            charge_id: 0,
            parking_id: 0,
            bike_status: "free",
            battery_status: 0,
            maintenance: "",
            coordinates: [56.180000, 15.567777]
        },
        {
            _id: 6,
            city_id: 3,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 100,
            maintenance: "",
            coordinates: [59.323776, 18.077349]
        },
        {
            _id: 7,
            city_id: 2,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 100,
            maintenance: "",
            coordinates: [59.380921, 13.506531]
        }
    ],
    charge: [
        {
            _id: 1,
            city_id: 1,
            coordinates: [56.181368, 15.590497, 56.181187, 15.590952]
        },
        {
            _id: 2,
            city_id: 2,
            coordinates: [59.380880, 13.502523, 59.380748, 13.502966]
        },
        {
            _id: 3,
            city_id: 3,
            coordinates: [59.318668, 18.062481, 59.318405, 18.063230]
        }
    ],
    city: [
        {
            _id: 1,
            name: "Karlskrona",
            coordinates: [56.193013, 15.559232, 56.152144, 15.634511]
        },
        {
            _id: 2,
            name: "Karlstad",
            coordinates: [59.390921, 13.466531, 59.364795, 13.541185]
        },
        {
            _id: 3,
            name: "Stockholm",
            coordinates: [59.343776, 18.027349, 59.301313, 18.111062]
        }
    ],
    parking: [
        {
            _id: 1,
            city_id: 1,
            coordinates: [56.166459, 15.593423, 56.166382, 15.593662]
        },
        {
            _id: 2,
            city_id: 2,
            coordinates: [59.375324, 13.491880, 59.375265, 13.492030]
        },
        {
            _id: 3,
            city_id: 3,
            coordinates: [59.321328, 18.059566, 59.321310, 18.059708]
        }
    ],
    price: [
        {
            _id: 1,
            starting_fee: 1,
            price_per_minute: 2,
            penalty_fee: 3,
            discount: 1
        }
    ],
    trip: [
        {
            _id: 1,
            user_id: 1,
            bike_id: 4,
            city: "Karlstad",
            start_time: "213409082021",
            stop_time: "213409082021",
            start_coordinates: [59.385921, 13.504531],
            stop_coordinates: [59.380921, 13.506531],
            average_speed: 18,
            distance: 2300,
            price: 80,
        },
        {
            _id: 2,
            user_id: 1,
            bike_id: 7,
            city: "Karlstad",
            start_time: "083409082021",
            stop_time: "093409082021",
            start_coordinates: [59.382921, 13.514531],
            stop_coordinates: [59.381921, 13.516531],
            average_speed: 16,
            distance: 2100,
            price: 70,
        },
        {
            _id: 3,
            user_id: 2,
            bike_id: 3,
            city: "Karlskrona",
            start_time: "083102112021",
            stop_time: "083902112021",
            start_coordinates: [59.385971, 13.490541],
            stop_coordinates: [59.385121, 13.490501],
            average_speed: 22,
            distance: 3100,
            price: 110,
        },
        {
            _id: 4,
            user_id: 2,
            bike_id: 3,
            city: "Karlskrona",
            start_time: "083102112021",
            stop_time: "083902112021",
            start_coordinates: [59.385971, 13.490541],
            stop_coordinates: [59.385121, 13.490501],
            average_speed: 22,
            distance: 3100,
            price: 110,
        }
    ],
    user: [
        {
            _id: 1,
            name: "Max",
            surname: "Mustermann",
            email: "max@mustermann.com",
            password: "encrypted",
            balance: 34,
            account_status: "active"
        },
        {
            _id: 2,
            name: "Lena",
            surname: "Andersson",
            email: "elan@lena.com",
            password: "encrypted",
            balance: 3435,
            account_status: "active"
        },
        {
            _id: 3,
            name: "Godzilla",
            surname: "Hårddiskson",
            email: "var@n.tv",
            password: "encrypted",
            balance: 20,
            account_status: "active"
        },
        {
            _id: 4,
            name: "Caspar David",
            surname: "Friedrich",
            email: "caspar@david.com",
            password: "encrypted",
            balance: 280,
            account_status: "active"
        }
    ]
};

module.exports = data;
