const Truck = {
    'id': {
        label: 'Id',
        validate: {
            unique: true
        }
    },
    'truck-palte': {
        label: 'Truck Palet',
        validate: {
            unique: true,
            require: true,
            type: 'string',
            format: '',
            searchAble: true,
            sortAble: true
        }
    },
    'cargo-type': {
        label: 'Cargo Type',
        validate: {
            require: true,
            type: 'multi',
            maxItem: 10,
            searchAble: true,
            sortAble: true
        }
    },
    'driver': {
        label: 'Driver',
        validate: {
            require: true,
            type: 'string',
            searchAble: true,
            sortAble: true
        }
    },
    'truck-type': {
        label: 'Truck Type'
    },
    'price': {
        label: 'Price',
        validate: {
            require: true,
            type: 'number',
            searchAble: true,
            sortAble: true
        }
    },
    'dimention-l': {
        label: 'Long Dimention',
        validate: {
            type: 'number',
        }
    },
    'dimention-w': {
        label: 'Width Dimention',
        validate: {
            type: 'number',
        }
    },
    'dimention-h': {
        label: 'Hight Dimention',
        validate: {
            type: 'number',
        }
    },
    'parking-address': {
        label: 'Parking Address',
        validate: {
            require: true,
            type: 'string',
            maxLength: 500,
            searchAble: true
        }
    },
    'production-year': {
        label: 'Product Year',
        validate: {
            type: 'number',
            maxValue: new Date().getFullYear()
        }
    },
    'status': {
        label: 'Status',
        defaultValue: 0,
        validate: {
            require: true,
            type: 'number',
            searchAble: true,
            sortAble: true
        }
    },
    'description': {
        label: 'Description',
        showCounter: true,
        validate: {
            type: 'string',
            maxLength: 200,
        }
    },
};
export default Truck;