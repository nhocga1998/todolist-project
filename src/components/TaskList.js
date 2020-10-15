import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux'
import * as action from '../actions/index'

class TaskList extends Component {
  
  constructor(props){
    super(props);
    this.state={
      filterName:'',
      filterStatus: -1 // all: -1, kích hoạt:1, ẩn:0
    }
  }
  
  onChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var filter = {
      name: name === 'filterName'? value: this.state.filterName,
      status: name === 'filterStatus'? value: this.state.filterStatus
    }
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value
    });
  }

  render() {
    //console.log(this.props.todos)
    var {tasks, filterTable, keyword, sort} = this.props; //var {tasks} = this.props.tasks

    //filter on table
    if (filterTable.name) {
      if (filterTable.name) {
        tasks = tasks.filter((tasks) => {
          return tasks.name.toLowerCase().indexOf(filterTable.name) !== -1;
        });
      }
    }
    tasks = tasks.filter((tasks) =>{
      if(filterTable.status === -1){
        return tasks;
      }else{
        return tasks.status === (filterTable.status === 1 ? true : false);
      }
    });


    if(keyword){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    // sort

    if(sort.by === 'name'){
      tasks.sort((a,b) =>{
        if(a.name > b.name){
          return sort.value;
        }
        else if(a.name < b.name){
          return -sort.value
        }else{
          return 0;
        }
      });
    }else{
      tasks.sort((a,b) =>{
        if(a.status > b.status){
          return -sort.value;
        }
        else if(a.status < b.status){
          return sort.value
        }else{
          return 0;
        }
      });
    }
    

    var {filterName, filterStatus} = this.state;
    var elmTask = tasks.map((task,index) =>{
      return <TaskItem 
      key={task.id} 
      index={index} 
      task={task}
      />
    });
    return (

        <div className="row mt-15">
        <div className="col-xs-14 col-sm-14 col-md-14 col-lg-14">
          
          <table className="table table-bordered table-hover mt-15">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng thái</th>
                <th className="text-center">Hành động</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  
                  <input 
                  type="text" 
                  name="filterName" 
                  className="form-control"
                  value={filterName}
                  onChange={this.onChange}
                  />
                  
                </td>
                <td>
                  
                  <select 
                  name="filterStatus"  
                  className="form-control"
                  value={filterStatus}
                  onChange={this.onChange}
                  >
                    <option value={-1}>Tất cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích hoạt</option>
                  </select>
                  
                </td>
                <td></td>
                </tr>
                {elmTask}
            </tbody>
          </table>
          
        </div>
      </div>


    );
  }
}

const mapStateToProps = (state) =>{
  return { 
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort

  }
};

const mapDispatchToProp = (dispatch, props) =>{
  return{
    onFilterTable: (filter) =>{
      dispatch(action.filterTask(filter))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProp)(TaskList);
