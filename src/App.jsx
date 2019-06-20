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
      pageIdx: 1,
      pageNumber: 1,
      numberItemOnePage: 1
    }

    Object.keys(TruckModel).forEach((key, idx) => {
      this.state.dataModel[key] = { value: '', errorCode: null };
    });
  }


  async getData() {
    let self = this;
    self.setState({ load: true });
    const result = await axios.get('http://localhost:3008/');
    const dataList = localStorage.getItem('dataList');
    let data = null;
    if (dataList) {
      try {
        data = JSON.parse(dataList)
      } catch (e) {
        console.log(e);
      }
    }
    if (result && result.data) {
      if (data) {
        result.data['dataList'] = [...data];
      }
      
      self.setState({
        header: result.data['header'],
        dataList: result.data['dataList'],
        mapping: result.data['mapping'],
        pageNumber: 10,//result.data['dataList'].lenth/this.state.numberItemOnePage,
        pageIdx: 1,
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

  convertItemToModel(dataItem) {
    return {
      id: { value: dataItem.id, errorCode: null },
      'truck-palte': { value: dataItem['truck-palte'], errorCode: null },
      'cargo-type': { value: dataItem['cargo-type'], errorCode: null },
      'driver': { value: dataItem['driver'], errorCode: null },
      'truck-type': { value: dataItem['truck-type'], errorCode: null },
      'price': { value: dataItem['price'], errorCode: null },
      'dimention-l': { value: dataItem['dimention']['l'], errorCode: null },
      'dimention-w': { value: dataItem['dimention']['w'], errorCode: null },
      'dimention-h': { value: dataItem['dimention']['h'], errorCode: null },
      'parking-address': { value: dataItem['parking-address'], errorCode: null },
      'production-year': { value: dataItem['production-year'], errorCode: null },
      'status': { value: dataItem['status'], errorCode: null },
      'description': { value: dataItem['description'], errorCode: null },
    }
  }

  onOpenEditForm = (truckId) => {
    let dataModel;
    for (let i = 0; i < this.state.dataList.length; i++) {
      if (truckId === this.state.dataList[i]['id']) {
        dataModel = this.convertItemToModel(this.state.dataList[i]);
      }
    }
    this.setState({
      openInputForm: true,
      formType: 1,
      dataModel: dataModel
    })
  }

  getTextValue = (attribute, value) => {
    let { mapping } = this.state;
    for (let i = 0; i < mapping.length; i++) {
      if (mapping[i].attribute === attribute) {
        for (let j = 0; j < mapping[i].mappingValues.length; j++) {
          if (mapping[i].mappingValues[j]['value'] == value) {
            return mapping[i].mappingValues[j]['text'];
          }
        }
      }
    }
  }

  convertDataModel = (dataModel) => {
    return {
      'id': dataModel['id'] || 1,
      'truck-palte': dataModel['truck-palte'].value,
      'cargo-type': dataModel['cargo-type'].value,
      'driver': dataModel['driver'].value,
      'truck-type': dataModel['truck-type'].value,
      'price': dataModel['price'].value,
      'dimention': {
        'l': dataModel['dimention-l'].value,
        'w': dataModel['dimention-w'].value,
        'h': dataModel['dimention-h'].value
      },
      'parking-address': dataModel['parking-address'].value,
      'production-year': dataModel['production-year'].value,
      'status': this.getTextValue('status', dataModel['status'].value),
      'description': dataModel['description'].value
    };
  }

  onSubmitForm = (dataModel) => {
    let { dataList } = this.state;
    if (0 === this.state.formType) {
      let data = this.convertDataModel(dataModel);
      data['id'] = dataList[dataList.length - 1]['id'] + 1;
      dataList.push(data);
      this.setState({
        dataList: dataList
      })
    } else if (1 === this.state.formType) {
      let data = this.convertDataModel(dataModel);
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].id === dataModel['id'].value) {
          dataList[i] = { ...data };
          break;
        }
      }
      this.setState({
        dataList: dataList
      })
    }
    localStorage.setItem('dataList', JSON.stringify(dataList));
  }

  onDelete = (truckId) => {
    let cf = window.confirm('Do you really want to delete this truck information?');
    if (true === cf) {
      let { dataList } = this.state;
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i]['id'] === truckId) {
          dataList.splice(i, 1);
          this.setState({
            dataList: dataList
          });
          localStorage.setItem('dataList', JSON.stringify(dataList));
          return true;
        }
      }
    }
  }

  onCloseFrom = () => {
    this.setState({
      openInputForm: false
    })
  }

  onChangePage = (pageIdx) => {
    this.setState({
      pageIdx: pageIdx
    })
  }

  render() {
    let content = null;
    if (this.state.load) {
      content =
        <div className="container cover">
          <h1 className="page-title">Truck Managment</h1>
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
        <div className="container cover">
          <h1 className="page-title">Truck Managment</h1>
          {inputForm}
          <div className="row">
            <PrehandleTable search={this.searchBy} value={this.state.header} addTruck={this.addTruck} />
            <Table
              header={this.state.header}
              dataList={this.state.dataFilterList}
              pageIdx={this.state.pageIdx}
              pageNumber={this.state.pageNumber}
              onOpenEditForm={this.onOpenEditForm}
              onDelete={this.onDelete}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>;
    }
    return content;
  }
}

export default App;
