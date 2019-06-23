import React from 'react';
import Checkbox from './Checkbox';

class MultiCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.value };
    }
    createCheckboxes = () => {
        let { mapping, value } = this.props;
        let checkboxes = [];
        for (let i = 0; i < mapping.length; i++) {
            mapping[i]['checked'] = false;
            if (value && Array.isArray(value) && 0 < value.length) {
                for (let j = 0; j < value.length; j++) {
                    if (parseInt(value[j]) === mapping[i].value) {
                        mapping[i]['checked'] = true;
                        break;
                    }
                }
            }
            checkboxes.push(<Checkbox
                key={`chbx-${i}`}
                label={mapping[i].text}
                onChange={this.onChange}
                value={mapping[i].value}
                checked={mapping[i].checked}
            />);
        }
        return checkboxes;
    }

    onChange = (value, checked) => {
        let { data } = this.state;
        if (null == data || !Array.isArray(data)) {
            data = [];
        }
        let idx = data.indexOf(value);
        if (idx === -1) {
            data.push(value);
        } else {
            data.splice(idx, 1);
        }
        this.setState({
            data: data
        })
        this.props.onChange({ target: { value: data } });
    }

    render() {
        return (
            <div className="checkbox-cover">
                <div></div>
                {this.createCheckboxes()}
            </div>
        );
    }
}

export default MultiCheckbox;