import React from 'react';
import Input from '../input/Input';
import TruckModel from '../../services/truckModel';
import validateFunc from './validate';
import './InputForm.scss';

class InputForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.value;
    }

    validateInputData = (key, value) => {
        let { validate } = TruckModel[key];
        let errorCode = null;

        if (null != validate) {
            Object.keys(validate).forEach((key, idx) => {
                if (null === errorCode) {
                    if ('require' === key) {
                        if(validateFunc['isEmpty'](value)){
                            errorCode = 0;
                        }
                    }
                    if ('maxLength' === key) {
                        if(validateFunc['outOfLength'](value, validate[key])){
                            errorCode = 1;
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
        Object.keys(this.state).forEach((key, idx) => {
            errorCode = this.validateInputData(key, this.state[key].value);
            console.log(this.state[key].errorCode, errorCode, key);
            if (null != this.state[key].errorCode) {
                error = true;
                console.log('error');
            } else if (null != errorCode) {
                error = true;
                this.setState({
                    [key]: { errorCode: errorCode, value: this.state[key].value }
                })
            }
        })
        if (!error) {
            this.props.onSubmit(this.state);
            this.props.onClose();
        }
    }

    onClose = () => {
        this.props.onClose();
    }

    render() {
        let trucks = [
            { type: 1, attr: 'truck-palte' },
            { type: 1, attr: 'truck-type' },
            { type: 1, attr: 'production-year' },
            { type: 1, attr: 'price' },
            { type: 1, attr: 'status' },
            { type: 1, attr: 'dimention' }
        ];
        let truckEles = [];
        trucks.forEach((value, idx) => {
            truckEles.push(
                <Input key={`add-truck-${idx}`}
                    type={value.type}
                    attribute={value.attr}
                    modelInfor={TruckModel[value.attr]}
                    onChange={this.onChange}
                    value={this.state[value.attr]} />);
        })

        let infor = [
            { type: 1, attr: 'cargo-type' },
            { type: 1, attr: 'driver' },
            { type: 1, attr: 'parking-address' },
            { type: 1, attr: 'description' }
        ];
        let inforEles = [];
        infor.forEach((value, idx) => {
            inforEles.push(
                <Input key={`add-infor-${idx}`}
                    type={value.type}
                    attribute={value.attr}
                    modelInfor={TruckModel[value.attr]}
                    onChange={this.onChange}
                    value={this.state[value.attr]} />);
        })
        let headerTitle = this.props.headerTitle ? this.props.headerTitle : 0 === this.props.formType ? 'Add new truck' : 'Edit new truck'
        return (
            <div className="container input-form-cover">
                <div className="row header">
                    <h3>{headerTitle}</h3>
                    <button type="button" className="btn btn-outline-danger" onClick={this.onClose}>X</button>
                </div>
                <div className="row body">
                    <div className="col-6 mr-1">
                        <span>Truck</span>
                        {truckEles}
                    </div>
                    <div className="col-6">
                        <span>Information</span>
                        {inforEles}
                    </div>
                </div>

                <div className="row footer">
                    <button type="button" className="btn btn-outline-warning mr-1" onClick={this.onClose}>Cancel</button>
                    <button type="button" className="btn btn-outline-success" onClick={this.onSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}

export default InputForm;