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
            city_id: 3,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 100,
            maintenance: "",
            coordinates: [22, 39]
        },
        {
            _id: 7,
            city_id: 2,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 100,
            maintenance: "",
            coordinates: [21, 56]
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
