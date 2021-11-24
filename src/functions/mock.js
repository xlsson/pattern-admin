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
            coordinates: [12, 34]
        },
        {
            _id: 2,
            city_id: 1,
            charge_id: 0,
            parking_id: 1,
            bike_status: "free",
            battery_status: 30,
            maintenance: "",
            coordinates: [22, 21]
        },
        {
            _id: 3,
            city_id: 1,
            charge_id: 0,
            parking_id: 1,
            bike_status: "free",
            battery_status: 70,
            maintenance: "",
            coordinates: [28, 32]
        },
        {
            _id: 4,
            city_id: 2,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 1,
            maintenance: "",
            coordinates: [22, 34]
        },
        {
            _id: 5,
            city_id: 1,
            charge_id: 0,
            parking_id: 0,
            bike_status: "free",
            battery_status: 0,
            maintenance: "",
            coordinates: [78, 39]
        },
        {
            _id: 6,
            city_id: 2,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 100,
            maintenance: "",
            coordinates: [22, 39]
        }
    ],
    charge: [
        {
            _id: 1,
            city_id: 1,
            coordinates: [14, 14, 15, 15]
        },
        {
            _id: 2,
            city_id: 1,
            coordinates: [64, 64, 66, 66]
        },
        {
            _id: 3,
            city_id: 2,
            coordinates: [84, 84, 86, 86]
        }
    ],
    city: [
        {
            _id: 1,
            name: "Karlskrona",
            coordinates: [0, 0, 100, 50]
        },
        {
            _id: 2,
            name: "Karlstad",
            coordinates: [0, 50, 100, 50]
        },
        {
            _id: 3,
            name: "Stockholm",
            coordinates: [0, 50, 100, 50]
        }
    ],
    parking: [
        {
            _id: 1,
            city_id: 1,
            coordinates: [44, 44, 55, 55]
        },
        {
            _id: 2,
            city_id: 1,
            coordinates: [34, 24, 36, 26]
        },
        {
            _id: 3,
            city_id: 2,
            coordinates: [34, 24, 36, 26]
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
    user: [
        {
            _id: 1,
            name: "Max",
            balance: 34,
            deleted: false
        },
        {
            _id: 2,
            name: "Lena",
            balance: 3435,
            deleted: false
        },
        {
            _id: 3,
            name: "Godzilla Hårddiskson",
            balance: 20,
            deleted: false
        },
        {
            _id: 4,
            name: "Caspar David Friedrich",
            balance: 280,
            deleted: false
        }
    ]
};

module.exports = data;
