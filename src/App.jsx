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
      sortBy: 0,
      sortType: 0,
      load: true,
      dataFilterList: []
    }

    // this.searchBy = this.searchBy.bind(this);
  }


  async getData() {
    let self = this;
    self.setState({ load: true });
    const result = await axios.get('http://localhost:3008/');
    if (result && result.data) {
      self.setState({
        header: result.data['header'],
        dataList: result.data['dataList'],
        mapping: result.data['mapping'],
        attributesInum: result.data['attributesInum'],
        load: false,
        dataFilterList: result.data['dataList']
      });
    }
  }

  componentDidMount() {
    this.getData()
  }

  searchBy = (searchBy, searchString) => {
    let { dataList, dataFilterList, header } = this.state;
    dataFilterList = dataList.filter((value, index) => {
      if ('' === searchBy) {
        for (let i = 0; i < header.length; i++) {
          if ('string' === typeof value[header[i].key] &&
            value[header[i].key].toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
            return true;
          }
        }
        return false;
      } else {
        return value[searchBy].toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
      }
    })
    this.setState({ dataFilterList: dataFilterList });
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
          <Search search={this.searchBy} value={this.state.header} />
          <Table
            header={this.state.header}
            dataList={this.state.dataFilterList}
          />
        </div>
      </div>
    );
  }
}

export default App;
