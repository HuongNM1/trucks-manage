const express = require('express')
const app = express();
var cors = require('cors');
const port = 3008

let data = {
    header: [
        { text: 'Truck plate', key: 'truck-palte', searchAble: true, sortAble: true },
        { text: 'Cargo type', key: 'cargo-type', searchAble: true, sortAble: true },
        { text: 'Driver', key: 'driver', searchAble: true, sortAble: true },
        { text: 'Truck type', key: 'truck-type', searchAble: true, sortAble: true },
        { text: 'Price', key: 'price', searchAble: true, sortAble: true },
        { text: 'Dimension', key: 'dimention', note: '(L-W-H)' },
        { text: 'Parking address', key: 'parking-address', searchAble: true, sortAble: true },
        { text: 'Production year', key: 'production-year', searchAble: true, sortAble: true },
        { text: 'Status', key: 'status', searchAble: true, sortAble: true },
        { text: 'Description', key: 'description' }
    ],
    mapping: {
        'status': [{ value: 0, text: 'New' }, { value: 1, text: 'In-use' }, { value: -1, text: 'Stopper' }],
        'cargo-type': [{
            value: 0, text: 'Computer',
            value: 1, text: 'Vagetable',
            value: 2, text: 'Kid toys',
            value: 3, text: 'Furniture',
            value: 4, text: 'Cars',
            value: 5, text: 'Motos',
            value: 6, text: 'Cosmetic',
            value: 7, text: 'Medicine',
            value: 8, text: 'Food',
            value: 9, text: 'Drink',
            value: 10, text: 'Meat',
            value: 11, text: 'Animal',
            value: 12, text: 'Fashion',
            value: 13, text: 'Machine'
        }]
    },
    attributesInum: ['status'],
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
            'status': 'New',
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
            'status': 'In-use',
            'description': 'no'
        },
        // {
        //     'id': 3,
        //     'truck-palte': '30A-50948',
        //     'cargo-type': 'Computer',
        //     'driver': 'Nguyen Van C',
        //     'truck-type': '50 ton',
        //     'price': '3000000000',
        //     'dimention': {
        //         'l': 200,
        //         'w': 10,
        //         'h': 5
        //     },
        //     'parking-address': 'ha noi',
        //     'production-year': '2019',
        //     'status': 'Stopping',
        //     'description': 'no'
        // },
        // {
        //     'id': 4,
        //     'truck-palte': '30A-50948',
        //     'cargo-type': 'Computer',
        //     'driver': 'Nguyen Van C',
        //     'truck-type': '50 ton',
        //     'price': '3000000000',
        //     'dimention': {
        //         'l': 200,
        //         'w': 10,
        //         'h': 5
        //     },
        //     'parking-address': 'ha noi',
        //     'production-year': '2019',
        //     'status': 'Stopping',
        //     'description': 'no'
        // },
        // {
        //     'id': 5,
        //     'truck-palte': '30A-50948',
        //     'cargo-type': 'Computer',
        //     'driver': 'Nguyen Van C',
        //     'truck-type': '50 ton',
        //     'price': '3000000000',
        //     'dimention': {
        //         'l': 200,
        //         'w': 10,
        //         'h': 5
        //     },
        //     'parking-address': 'ha noi',
        //     'production-year': '2019',
        //     'status': 'Stopping',
        //     'description': 'no'
        // },
        // {
        //     'id': 6,
        //     'truck-palte': '30A-50948',
        //     'cargo-type': 'Computer',
        //     'driver': 'Nguyen Van C',
        //     'truck-type': '50 ton',
        //     'price': '3000000000',
        //     'dimention': {
        //         'l': 200,
        //         'w': 10,
        //         'h': 5
        //     },
        //     'parking-address': 'ha noi',
        //     'production-year': '2019',
        //     'status': 'Stopping',
        //     'description': 'no'
        // },
        // {
        //     'id': 7,
        //     'truck-palte': '30A-50948',
        //     'cargo-type': 'Computer',
        //     'driver': 'Nguyen Van C',
        //     'truck-type': '50 ton',
        //     'price': '3000000000',
        //     'dimention': {
        //         'l': 200,
        //         'w': 10,
        //         'h': 5
        //     },
        //     'parking-address': 'ha noi',
        //     'production-year': '2019',
        //     'status': 'Stopping',
        //     'description': 'no'
        // },
        // {
        //     'id': 8,
        //     'truck-palte': '30A-50948',
        //     'cargo-type': 'Computer',
        //     'driver': 'Nguyen Van C',
        //     'truck-type': '50 ton',
        //     'price': '3000000000',
        //     'dimention': {
        //         'l': 200,
        //         'w': 10,
        //         'h': 5
        //     },
        //     'parking-address': 'ha noi',
        //     'production-year': '2019',
        //     'status': 'Stopping',
        //     'description': 'no'
        // },
        // {
        //     'id': 9,
        //     'truck-palte': '30A-50948',
        //     'cargo-type': 'Computer',
        //     'driver': 'Nguyen Van C',
        //     'truck-type': '50 ton',
        //     'price': '3000000000',
        //     'dimention': {
        //         'l': 200,
        //         'w': 10,
        //         'h': 5
        //     },
        //     'parking-address': 'ha noi',
        //     'production-year': '2019',
        //     'status': 'Stopping',
        //     'description': 'no'
        // }
    ]
};

app.use(cors());
app.get('/', (req, res) => res.send(data))

app.get('/trucks/', (req, res) => res.send(data))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))