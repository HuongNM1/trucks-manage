const express = require('express')
const app = express();
var cors = require('cors');
const port = 3008

let data = {
    header: [
        { text: 'Truck plate', key: 'truck-palte', searchAble: true, sortAble: true },
        { text: 'Cargo type', key: 'cargo-type', searchAble: false, sortAble: true },
        { text: 'Cargo type', key: 'cargo-type-show', searchAble: true, sortAble: false },
        { text: 'Driver', key: 'driver', searchAble: true, sortAble: true },
        { text: 'Truck type', key: 'truck-type', searchAble: true, sortAble: true },
        { text: 'Price', key: 'price', searchAble: true, sortAble: true },
        { text: 'Dimension', key: 'dimention', note: 'L-W-H', searchAble: true, sortAble: false },
        { text: 'Dimension', key: 'dimention-l' },
        { text: 'Dimension', key: 'dimention-w' },
        { text: 'Dimension', key: 'dimention-h' },
        { text: 'Parking address', key: 'parking-address', searchAble: true, sortAble: false },
        { text: 'Production year', key: 'production-year', searchAble: true, sortAble: true },
        { text: 'Status', key: 'status', searchAble: false, sortAble: false },
        { text: 'Status', key: 'status-show', searchAble: true, sortAble: true },
        { text: 'Description', key: 'description', searchAble: true, sortAble: false }
    ],
    mapping: {
        'status': [{ value: 0, text: 'New' }, { value: 1, text: 'In-use' }, { value: -1, text: 'Stopper' }],
        'cargo-type': [
            { value: 0, text: 'Computer' },
            { value: 1, text: 'Vagetable' },
            { value: 2, text: 'Kid toys' },
            { value: 3, text: 'Furniture' },
            { value: 4, text: 'Cars' },
            { value: 5, text: 'Motos' },
            { value: 6, text: 'Cosmetic' },
            { value: 7, text: 'Medicine' },
            { value: 8, text: 'Food' },
            { value: 9, text: 'Drink' },
            { value: 10, text: 'Meat' },
            { value: 11, text: 'Animal' },
            { value: 12, text: 'Fashion' },
            { value: 13, text: 'Machine' }
        ]
    },
    attributesInum: ['status'],
    dataList: []
};

app.use(cors());
app.get('/', (req, res) => {
    data.dataList=[];
    for(let i = 1; i <=102;i++){
        data.dataList.push(
            {
                'id': i,
                'truck-palte': `30A-50${i}`,
                'cargo-type': [0, 1, 2, 3],
                'cargo-type-show': 'Computer, Vagetable, Kid toys, Furniture',
                'driver': `Nguyen Van A${i}`,
                'truck-type': `${i} ton`,
                'price': i*10000000,
                'dimention': `${i+7}-${i}-${i/2}`,
                'dimention-l': i+7,
                'dimention-w': i,
                'dimention-h': i/2,
                'parking-address': 'ha noi',
                'production-year': 1910+i,
                'status-show': 'New',
                'status': 0,
                'description': 'no'
            }
        )
    }
    res.send(data)
});

app.get('/trucks/', (req, res) => res.send(data))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))