import React from 'react';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdownClass: '',
            dropdownExpand: false,
            dropdownTitle: props.dropdownTitle || 'All'
        }

        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        if ('' === this.state.showDropdownClass) {
            this.setState({
                showDropdownClass: 'show',
                dropdownExpand: true
            });
        } else {
            this.setState({
                showDropdownClass: '',
                dropdownExpand: false
            });
        }
    }
    render() {
        let dropItems = [];
        if (Array.isArray(this.props.value) && 0 < this.props.value.length) {
            for (let i = 0; i < this.props.value.length; i++) {
                dropItems.push(
                    <button key={i}
                        className="dropdown-item"
                        type="button"
                        onClick={() => {
                            this.props.getSearchBy(this.props.value[i].key);
                            this.toggleShow();
                            this.setState({ dropdownTitle: this.props.value[i].text })
                        }}
                    >
                        {this.props.value[i].text}
                    </button>);
            }
            return (
                <div className={"dropdown " + this.state.showDropdownClass}>
                    <button className="btn btn-secondary dropdown-toggle"
                        type="button" id="dropdownMenu2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={this.state.dropdownExpand}
                        onClick={() => {
                            this.toggleShow();
                        }}>
                        {this.state.dropdownTitle}
                    </button>
                    <div className={"dropdown-menu " + this.state.showDropdownClass} aria-labelledby="dropdownMenu2">
                        <button key={'all'}
                            className="dropdown-item"
                            type="button"
                            onClick={() => {
                                this.props.getSearchBy('');
                                this.toggleShow();
                                this.setState({ dropdownTitle: 'All' })
                            }}
                        >
                            All
                        </button>
                        {dropItems}
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default Dropdown;