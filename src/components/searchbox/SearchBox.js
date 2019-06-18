import React from 'react';

class SearchBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Search here..." aria-describedby="button-addon2" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.props.search(1, 'hello')}>Search</button>
                </div>
            </div>
        );
    }
}

export default SearchBox;