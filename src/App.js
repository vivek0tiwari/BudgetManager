import logo from './logo.svg';
import './App.css';
import {Table} from './components/Tabel'
import {DropDown} from './components/DropDown'
import {Modal} from './containers/ModalPopup'
import {InputBox} from './components/InputBox'
import {data, config, filterConfig, EDITABLE_FILEDS} from './data/billTable'
import _uniqueId from 'lodash/uniqueId';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import {PureComponent} from 'react'
function findMinNumOfBills(bills, gudget){
  if(!bills) return 
  const sortedBills = bills.sort((a,b)=>(parseInt(b.amount) - parseInt(a.amount)))
  let nearestSum = 0 
  let ids = []
  for (let i=0; i<sortedBills.length; i++) {
    if(sortedBills[i].amount < gudget && nearestSum<gudget){
      nearestSum = nearestSum + parseInt(sortedBills[i].amount) 
      ids.push(sortedBills[i].id)
    }
  }
  return ids
}
const COMMAND_TYPE ={
  EDIT:1,
  ADD:2
}
class App extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      bills: data,
      showModal : false,
      selectedRecord: {},
      filterdData: data,
      budget: 5000
    }
  }
  onEdit = row =>{
    this.setState({selectedRecord:row},()=>{
      this.openModal()
    })
  }
  renderInputFileds = () =>{
    return config.map((field, index)=>{
      if(field.key.toLocaleLowerCase() === 'id'){
        return <div><span>{field.label}</span> :{this.state.selectedRecord[field.key]}</div>
      }
      return <InputBox field={field.key} value={this.state.selectedRecord[field.key]||''} title={field.label}
      onChange={this.onInputFieldChange} key={`${index}#${field}`}/>
    })
  }
  onInputFieldChange=(fieldName, e)=>{
    this.setState({selectedRecord: {...this.state.selectedRecord, [fieldName]: e.target.value}})
  }
  closeModal = ()=>{
    this.setState({showModal: false, selectedRecord:{}})
  }
  openModal = ()=>{
    this.setState({showModal: true})
  }
  onDelete = row =>{
    const bills = this.state.bills.filter(data=>data.id!==row.id)
    this.setState({bills})
  }
  onSave = (command, e) =>{
    const {selectedRecord} = this.state
    const updateIndex = this.state.bills.findIndex(bill=>bill.id===selectedRecord.id)
    if(updateIndex>-1){ // if index found then its edit record 
      let newState = [...this.state.bills]
      newState[updateIndex] = selectedRecord;
      this.setState({bills:newState,filterdData:[...newState] ,selectedRecord:{}}, ()=>{
        this.closeModal()
      })
    }else{ // else add new record 
      this.setState({bills:[...this.state.bills, selectedRecord], filterdData:[...this.state.filterdData, selectedRecord], selectedRecord:{}}, ()=>{
        this.closeModal()
      })
    }
  }
  onFilter = (e)=>{
    if(e.target.value === 'All'){
      this.setState({filterdData:[...this.state.bills]})
      return
    }
    const filterdData = this.state.bills.filter(data=>data.category.toLocaleLowerCase()===e.target.value.toLocaleLowerCase())
    this.setState({filterdData})
  }
  onAdd = () =>{
    this.setState({selectedRecord:{id:_uniqueId('id_')}}, ()=>{
      this.openModal()
    })
  }
  findBillsForBudget = ()=>{
    const {budget, budgetBillIndexs, bills} = this.state;
    const sortedBills = findMinNumOfBills([...bills], budget)
    console.log(sortedBills)
  }
  
  render(){
    const data = {
      name: "traffic",
      columns: ["time", "value"],
      points: this.state.bills.map(bill=>([bill.date, bill.amount]))
    };
    const series1 = new TimeSeries(data);
    return (
      <div className="App">
        <Modal show={this.state.showModal} handleClose={this.closeModal} handleSave={this.onSave.bind(this, COMMAND_TYPE.EDIT)} title={'Add/Edit'}>
          {this.renderInputFileds()}
        </Modal>
        <div>
          <DropDown data={filterConfig} onChange={this.onFilter} title='Category'/>
          <button onClick={this.onAdd}>Add</button>
        </div>
        <Table data={this.state.filterdData} config={config} onEdit={this.onEdit} onDelete={this.onDelete}></Table>
        <button onClick={this.findBillsForBudget}>Calculate Bills</button>
        <ChartContainer timeRange={series1.timerange()} width={800} format="%b '%y">
            <ChartRow height="200">
            <YAxis id="axis1" label="Amount" min={0} max={100} width="80" type="linear"/>
                <Charts>
                    <LineChart axis="axis1" series={series1}/>
                </Charts>
            </ChartRow>
        </ChartContainer>
      </div>
    );
  }
}

export default App;
