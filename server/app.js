const express = require('express')
const app = express();
var cors = require('cors');
const port = 3008

let data = {
    header: [
        { text: 'Truck plate', key: 'truck-palte' },
        { text: 'Cargo type', key: 'cargo-type' },
        { text: 'Driver', key: 'driver' },
        { text: 'Truck type', key: 'truck-type' },
        { text: 'Price', key: 'price' },
        { text: 'Dimension', key: 'dimention', note: '(L-W-H)' },
        { text: 'Parking address', key: 'parking-address' },
        { text: 'Production year', key: 'production-year' },
        { text: 'Status', key: 'status' },
        { text: 'Description', key: 'description' }
    ],
    dataList: [
        {
            'id': 1,
            'truck-palte': '30A-50948',
            'cargo-type': 'Computer',
            'driver': 'Nguyen Van A',
            'truck-type': '5 ton',
            'price': '1000000000',
            'dimention': {
                'l': 2,
                'w': 10,
                'h': 5
            },
            'parking-address': 'ha noi',
            'production-year': '2019',
            'status': 1,
            'description': 'no'
        },
        {
            'id': 2,
            'truck-palte': '30A-50948',
            'cargo-type': 'Computer',
            'driver': 'Nguyen Van B',
            'truck-type': '15 ton',
            'price': '2000000000',
            'dimention': {
                'l': 50,
                'w': 10,
                'h': 5
            },
            'parking-address': 'ha noi',
            'production-year': '2019',
            'status': 1,
            'description': 'no'
        },
        {
            'id': 3,
            'truck-palte': '30A-50948',
            'cargo-type': 'Computer',
            'driver': 'Nguyen Van C',
            'truck-type': '50 ton',
            'price': '3000000000',
            'dimention': {
                'l': 200,
                'w': 10,
                'h': 5
            },
            'parking-address': 'ha noi',
            'production-year': '2019',
            'status': 1,
            'description': 'no'
        }
    ]
};

app.use(cors());
app.get('/', (req, res) => res.send(data))

app.get('/trucks/', (req, res) => res.send(data))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))