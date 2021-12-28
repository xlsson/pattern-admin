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
            coordinates: { lat: 56.183013, long: 15.573461 }
        },
        {
            _id: 2,
            city_id: 1,
            charge_id: 0,
            parking_id: 1,
            bike_status: "free",
            battery_status: 30,
            maintenance: "",
            coordinates: { lat: 56.185000, long: 15.603461 }
        },
        {
            _id: 3,
            city_id: 1,
            charge_id: 0,
            parking_id: 1,
            bike_status: "free",
            battery_status: 70,
            maintenance: "",
            coordinates: { lat: 56.165000, long: 15.613461 }
        },
        {
            _id: 4,
            city_id: 2,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 1,
            maintenance: "",
            coordinates: { lat: 59.385921, long: 13.490531 }
        },
        {
            _id: 5,
            city_id: 1,
            charge_id: 0,
            parking_id: 0,
            bike_status: "free",
            battery_status: 0,
            maintenance: "",
            coordinates: { lat: 56.180000, long: 15.567777 }
        },
        {
            _id: 6,
            city_id: 3,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 100,
            maintenance: "",
            coordinates: { lat: 59.323776, long: 18.077349 }
        },
        {
            _id: 7,
            city_id: 2,
            charge_id: 1,
            parking_id: 0,
            bike_status: "free",
            battery_status: 100,
            maintenance: "",
            coordinates: { lat: 59.380921, long: 13.506531 }
        }
    ],
    charge: [
        {
            _id: 1,
            city_id: 1,
            coordinates: {
                northwest: { lat: 56.181368, long: 15.590497 },
                southeast: { lat: 56.181187, long: 15.590952 }
            }
        },
        {
            _id: 2,
            city_id: 2,
            coordinates: {
                northwest: { lat: 59.380880, long: 13.502523 },
                southeast: { lat: 59.380748, long: 13.502966 }
            }
        },
        {
            _id: 3,
            city_id: 3,
            coordinates: {
                northwest: { lat: 59.318668, long: 18.062481 },
                southeast: { lat: 59.318405, long: 18.063230 }
            }
        },
        {
            _id: 4,
            city_id: 2,
            coordinates: {
                northwest: { lat: 59.382503, long: 13.495277 },
                southeast: { lat: 59.382399, long: 13.495710 }
            }
        }
    ],
    city: [
        {
            _id: 1,
            name: "Karlskrona",
            coordinates: {
                northwest: { lat: 56.193013, long: 15.559232 },
                southeast: { lat: 56.152144, long: 15.634511 }
            }
        },
        {
            _id: 2,
            name: "Karlstad",
            coordinates: {
                northwest: { lat: 59.390921, long: 13.466531 },
                southeast: { lat: 59.364795, long: 13.541185 }
            }
        },
        {
            _id: 3,
            name: "Stockholm",
            coordinates: {
                northwest: { lat: 59.343776, long: 18.027349 },
                southeast: { lat: 59.301313, long: 18.111062 }
            }
        }
    ],
    parking: [
        {
            _id: 1,
            city_id: 1,
            coordinates: {
                northwest: { lat: 56.166459, long: 15.593423 },
                southeast: { lat: 56.166382, long: 15.593662 }
            }
        },
        {
            _id: 2,
            city_id: 2,
            coordinates: {
                northwest: { lat: 59.375324, long: 13.491880 },
                southeast: { lat: 59.375265, long: 13.492030 }
            }
        },
        {
            _id: 3,
            city_id: 3,
            coordinates: {
                northwest: { lat: 59.321328, long: 18.059566 },
                southeast: { lat: 59.321310, long: 18.059708 }
            }
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
            start_coordinates: { lat: 59.385921, long: 13.504531 },
            stop_coordinates: { lat: 59.380921, long: 13.506531 },
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
            start_coordinates: { lat: 59.382921, long: 13.514531 },
            stop_coordinates: { lat: 59.381921, long: 13.516531 },
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
            start_coordinates: { lat: 59.385971, long: 13.490541 },
            stop_coordinates: { lat: 59.385121, long: 13.490501 },
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
            start_coordinates: { lat: 59.385971, long: 13.490541 },
            stop_coordinates: { lat: 59.385121, long: 13.490501 },
            average_speed: 22,
            distance: 3100,
            price: 110,
        }
    ],
    user: [
        {
            _id: 1,
            firstname: "Max",
            lastname: "Mustermann",
            email: "max@mustermann.com",
            password: "encrypted",
            phone: "+465667",
            payment_method: "unknown",
            card_information: "unknown",
            balance: 34,
            account_status: "active"
        },
        {
            _id: 2,
            firstname: "Lena",
            lastname: "Andersson",
            email: "elan@lena.com",
            password: "encrypted",
            phone: "+465667",
            payment_method: "unknown",
            card_information: "unknown",
            balance: 3435,
            account_status: "active"
        },
        {
            _id: 3,
            firstname: "Godzilla",
            lastname: "Hårddiskson",
            email: "var@n.tv",
            password: "encrypted",
            phone: "+465667",
            payment_method: "unknown",
            card_information: "unknown",
            balance: 20,
            account_status: "active"
        },
        {
            _id: 4,
            firstname: "Caspar David",
            lastname: "Friedrich",
            email: "caspar@david.com",
            password: "encrypted",
            phone: "+465667",
            payment_method: "unknown",
            card_information: "unknown",
            balance: 280,
            account_status: "active"
        }
    ]
};

function updateUsers(newData) {
    data.user = newData;
}

module.exports = { data: data, updateUsers: updateUsers };
