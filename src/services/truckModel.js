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
            type: 'string',
            searchAble: true,
            sortAble: true
        }
    },
    'dimention-l': {
        label: 'Dimention-L',
        validate: {
            type: 'number',
        }
    },
    'dimention-w': {
        label: 'Dimention-W',
        validate: {
            type: 'number',
        }
    },
    'dimention-h': {
        label: 'Dimention-H',
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
    },
    'status': {
        label: 'Status',
        validate: {
            require: true,
            type: 'number',
            searchAble: true,
            sortAble: true
        }
    },
    'description': {
        label: 'Description',
        validate: {
            type: 'string',
            maxLength: 200,
        }
    },
};
export default Truck;