import React from 'react';
import axios from 'axios';
import Search from './components/searchbox/SearchBox';
import Table from './components/table/Table';
import Load from './components/Load';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      header: [],
      dataList: [],
      searchString: '',
      searchby: 0,
      sortBy: 0,
      sortType: 0,
      load: true,
    }

    this.searchBy = this.searchBy.bind(this);
  }


  async getData() {
    let self = this;
    self.setState({ load: true });
    const result = await axios.get('http://localhost:3008/');
    if (result && result.data) {
      self.setState({
        header: result.data['header'],
        dataList: result.data['dataList'],
        load: false
      });
    }
  }

  componentDidMount() {
    this.getData()
  }

  searchBy(searchBy, searchString){
    console.log(searchBy, searchString);
  }

  render() {
    if (this.state.load) {
      return (
        <div className="container">
            <Load />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <Search search={this.searchBy}/>
          <Table header={this.state.header} dataList={this.state.dataList} />
        </div>
      </div>
    );
  }
}

export default App;
