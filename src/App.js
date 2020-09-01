import React from 'react';
import SudoTable from '@/components/SudoTable'
import SudoKeyBoard from '@/components/SudoKeyBoard'
import {getSudoList,ArrayMap,checkSudoList} from '@/utils/sudoku.js'
import './App.scss';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      selectedKey:[]
    }
  }
  
  componentDidMount(){
    let list = getSudoList();
    list = ArrayMap(list,(value)=>{
      return {
        value:value,
        origin:value !== 0
      }
    })
    this.setState({
      list:list
    })
  }
  
  keyBoardClick=(num)=>{
    const {list,selectedKey} = this.state;
    list[selectedKey[0]][selectedKey[1]].value = num;
    this.setState({
      list
    })
  }
  setKey=(x,y)=>{
    const {list} = this.state;
    if(list[x][y].origin){
      return
    }
    this.setState({
      selectedKey:[x,y]
    })
  }
  summit = ()=>{
    let {list} = this.state;
    list = ArrayMap(list,(value)=>{
      return value.value
    })
    if(checkSudoList(list)){
      window.alert('检查通过')
    }else{
      window.alert('检查不通过')
    }
  }
  render(){

    return (<div className="App">
              <SudoTable selectedKey={this.state.selectedKey} 
              setKey={this.setKey}
              list={this.state.list}/>
              <SudoKeyBoard disabled={this.state.selectedKey.length === 0} click={this.keyBoardClick} />
              <button className="submit" onClick={()=>{this.summit()}}>提交</button>
            </div>)
  }
}

