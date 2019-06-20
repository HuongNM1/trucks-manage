import React from 'react';
import axios from 'axios';
import PrehandleTable from './components/prehandletable/PrehandleTable';
import Table from './components/table/Table';
import Load from './components/Load';
import InputForm from './components/form/InputForm';
import TruckModel from './services/truckModel';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      header: [],
      dataList: [],
      sortBy: 0,
      sortType: 0,
      load: true,
      dataFilterList: [],
      openInputForm: false,
      typeInputForm: 0,
      dataModel: {},
      formType: 0,
    }
    
    Object.keys(TruckModel).forEach((key, idx) => {
      this.state.dataModel[key] = { value: '', errorCode: null };
    });
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
        dataFilterList: result.data['dataList'],
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

  addTruck = () => {
    this.setState({
      openInputForm: true,
      formType: 0
    })
  }

  onOpenEditForm = (truckId) => {
    this.setState({
      openInputForm: true,
      formType: 1
    })
  }

  onSubmitForm = (dataModel) => {
    console.log(dataModel);
  }

  onCloseFrom = () => {
    this.setState({
      openInputForm: false
    })
  }


  render() {
    let content = null;
    if (this.state.load) {
      content =
        <div className="container">
          <Load />
        </div>;
    } else {
      let inputForm = this.state.openInputForm ?
        <div className="row">
          <InputForm
            onSubmit={this.onSubmitForm}
            onClose={this.onCloseFrom}
            formType={this.state.formType}
            value={this.state.dataModel} />
        </div> : '';
      content =
        <div className="container">
          {inputForm}
          <div className="row">
            <PrehandleTable search={this.searchBy} value={this.state.header} addTruck={this.addTruck} />
            <Table
              header={this.state.header}
              dataList={this.state.dataFilterList}
              onOpenEditForm={this.onOpenEditForm}
            />
          </div>
        </div>;
    }
    return content;
  }
}

export default App;
