import React from 'react';
import Input from '../input/Input';
import TruckModel from '../../services/truckModel';
import validateFunc from './validate';
import './InputForm.scss';

class InputForm extends React.Component {

    constructor(props) {
        super(props);
        if (0 === props.formType) {
            // reset dataModel to default value in truck model
            let dataModel = {};
            Object.keys(TruckModel).forEach((key, idx) => {
                dataModel[key] = { value: TruckModel[key].value, errorCode: null };
            });
            this.state = dataModel;
        } else {
            this.state = props.value;
        }
    }

    validateInputData = (key, value) => {
        let { validate } = TruckModel[key];
        let errorCode = null;

        if (null != validate) {
            Object.keys(validate).forEach((key, idx) => {
                if (null === errorCode) {
                    if ('require' === key) {
                        if (validateFunc['isEmpty'](value)) {
                            errorCode = 0;
                        }
                    }
                    if ('maxLength' === key) {
                        if (validateFunc['outOfLength'](value, validate[key])) {
                            errorCode = 1;
                        }
                    }
                    if ('number' === validate['type']) {
                        if (validateFunc['isNaN'](value)) {
                            errorCode = 2;
                        }
                    }
                    if ('maxValue' === key) {
                        if (validateFunc['outOfMaxValue'](value, validate[key])) {
                            errorCode = 3;
                        }
                    }
                    if ('isPalete' === key) {
                        if (validateFunc['isNotisPalete'](value)) {
                            errorCode = 4;
                        }
                    }
                    if ('maxItem' === key) {
                        if (validateFunc['outOfMaxItem'](value, validate[key])) {
                            errorCode = 5;
                        }
                    }
                }
            });
        }
        return errorCode;
    }

    onChange = (key, value) => {
        this.setState({
            [key]: {
                value: value,
                errorCode: this.validateInputData(key, value)
            }
        });
    }

    onSubmit = () => {
        let error = false;
        let errorCode = null;
        let value = '';
        Object.keys(this.state).forEach((key, idx) => {
            value = null != this.state[key].value &&
                'object' !== typeof this.state[key].value &&
                'boolean' !== typeof this.state[key].value ?
                this.state[key].value.toString().trim() :
                this.state[key].value;
            errorCode = this.validateInputData(key, value);
            if (null != this.state[key].errorCode) { // ?????
                error = true;
                console.log('error');
            } else if (null != errorCode) {
                error = true;
                this.setState({
                    [key]: { errorCode: errorCode, value: value }
                })
            }

        })
        if (!error) {
            let values = {};
            Object.keys(this.state).forEach((key, idx) => {
                if (this.state[key].value &&
                    'object' !== typeof this.state[key].value &&
                    'boolean' !== typeof this.state[key].value) {
                    values[key] = { errorCode: this.state[key].errorCode, value: this.state[key].value.toString().trim() }
                } else {
                    values[key] = { errorCode: this.state[key].errorCode, value: this.state[key].value };
                }
            });
            this.props.onSubmit(values);
            this.props.onClose();
        }
    }

    onClose = () => {
        this.props.onClose();
    }

    getInputEles = () => {
        let trucks = [
            { type: 1, attr: 'truck-palte' },
            { type: 4, attr: 'cargo-type' },
            { type: 1, attr: 'driver' },
            { type: 1, attr: 'truck-type' },
            { type: 1, attr: 'dimention-l' },
            { type: 1, attr: 'dimention-w' },
            { type: 1, attr: 'dimention-h' },

            { type: 1, attr: 'price' },
            { type: 1, attr: 'production-year' },
            { type: 3, attr: 'status' },
            { type: 2, attr: 'parking-address' },
            { type: 2, attr: 'description' }
        ];
        let truckEles = [];
        let input = '';
        trucks.forEach((value, idx) => {
            input = <Input key={`add-truck-${idx}`}
                type={value.type}
                attribute={value.attr}
                modelInfor={TruckModel[value.attr]}
                onChange={this.onChange}
                value={this.state[value.attr]}
            />
            if (-1 !== [3, 4].indexOf(value.type)) {
                input = <Input key={`add-truck-${idx}`}
                    type={value.type}
                    attribute={value.attr}
                    modelInfor={TruckModel[value.attr]}
                    onChange={this.onChange}
                    value={this.state[value.attr]}
                    mapping={this.props.mapping || []}
                />
            }
            truckEles.push(input);
        })
        return truckEles;
    }

    render() {
        let truckElems = this.getInputEles();
        let truckEles1 = truckElems.slice(0, 7);
        let truckEles2 = truckElems.slice(7);
        let headerTitle = this.props.headerTitle ? this.props.headerTitle : 0 === this.props.formType ? 'Add new truck' : 'Edit new truck'; return (
            <div>
                <div className="input-form-cover">
                    <div className="header p-2 mb-3">
                        <div className="header-title">{headerTitle}</div>
                        <button type="button" className="btn btn-outline-danger close-header-button" onClick={this.onClose}>X</button>
                    </div>
                    <div className="body">
                        <div className="left-content mr-1">
                            {truckEles1}
                        </div>
                        <div className="right-content">
                            {truckEles2}
                        </div>
                    </div>
                    <div className="footer p-2">
                        <button type="button" className="btn btn-outline-warning mr-1" onClick={this.onClose}>Cancel</button>
                        <button type="button" className="btn btn-outline-success" onClick={this.onSubmit}>Submit</button>
                    </div>

                </div>
                <div className="backdrop" onClick={this.onClose}></div>
            </div>
        );
    }
}

export default InputForm;