const Truck = {
    'id': {
        label: 'Id',
        value: '',
        errorCode: null,
        showOnList: false,
        showOnInputForm: false,
        validate: {
            unique: true
        }
    },
    'truck-palte': {
        label: 'Truck Palet',
        value: '',
        errorCode: null,
        showOnList: true,
        showOnInputForm: true,
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
        value: '',
        // showValue: (model) => {
        //     let listValueStr = 'No cargo type';
        //     let valueArray = model['cargo-type'].value;
        //     if (valueArray && Array.isArray(valueArray) && 0 < valueArray.length) {
        //         for (let i = 0; i < valueArray.length; i++) {

        //         }
        //     }
        //     return listValueStr;
        // },
        errorCode: null,
        showOnList: true,
        showOnInputForm: true,
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
        value: '',
        errorCode: null,
        showOnList: true,
        showOnInputForm: true,
        validate: {
            require: true,
            type: 'string',
            searchAble: true,
            sortAble: true
        }
    },
    'truck-type': {
        label: 'Truck Type',
        value: '',
        errorCode: null,
        showOnList: true,
        showOnInputForm: true,
    },
    'price': {
        label: 'Price',
        value: '',
        errorCode: null,
        showOnList: true,
        showOnInputForm: true,
        validate: {
            require: true,
            type: 'number',
            searchAble: true,
            sortAble: true
        }
    },
    'dimention': {
        label: 'Dimention',
        showValue: (model) => { return `${model['dimention-l'].value}-${model['dimention-w'].value}-${model['dimention-h'].value}` },
        showOnList: true,
        showOnInputForm: false,
    },
    'dimention-l': {
        label: 'Long Dimention',
        value: '',
        errorCode: null,
        showOnList: false,
        showOnInputForm: true,
        validate: {
            type: 'number',
        }
    },
    'dimention-w': {
        label: 'Width Dimention',
        value: '',
        errorCode: null,
        showOnList: false,
        showOnInputForm: true,
        validate: {
            type: 'number',
        }
    },
    'dimention-h': {
        label: 'Hight Dimention',
        value: '',
        errorCode: null,
        showOnList: false,
        showOnInputForm: true,
        validate: {
            type: 'number',
        }
    },
    'parking-address': {
        label: 'Parking Address',
        value: '',
        errorCode: null,
        showOnList: true,
        showOnInputForm: true,
        validate: {
            require: true,
            type: 'string',
            maxLength: 500,
            searchAble: true
        }
    },
    'production-year': {
        label: 'Product Year',
        value: '',
        errorCode: null,
        showOnList: true,
        showOnInputForm: true,
        validate: {
            type: 'number',
            maxValue: new Date().getFullYear()
        }
    },
    'status': {
        label: 'Status',
        value: 0,
        errorCode: null,
        showOnList: true,
        showOnInputForm: true,
        validate: {
            require: true,
            type: 'number',
            searchAble: true,
            sortAble: true
        }
    },
    'description': {
        label: 'Description',
        value: '',
        errorCode: null,
        showCounter: true,
        showOnList: true,
        showOnInputForm: true,
        validate: {
            type: 'string',
            maxLength: 200,
        }
    },
};
export default Truck;