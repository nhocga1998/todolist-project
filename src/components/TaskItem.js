import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as action from '../actions/index'

class TaskItem extends Component {

  onUpdateStatus = () =>{
    this.props.onUpdateStatus(this.props.task.id);
  }

  onDelete = () =>{
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm();
    //dispatch(action.deleteItem)
    
  }

  onEditTask = () =>{
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);

  }

  render() {
    var {task,index} = this.props;
    return (

        <tr>
        <td>{index+1}</td>
        <td>{task.name}</td>
        <td 
        className={task.status === true ? 'label label-danger' : 'label label-success'}
        onClick={this.onUpdateStatus} style={{marginLeft:"50px", height:"50px"}}>
          {task.status === true? 'kích hoạt' : 'Ẩn'}
        </td>
        <td>
        <button 
        type="submit"
        className="btn btn-warning"
        onClick={this.onEditTask}>
        <span className="fa fa-plus mr-S"></span>Sửa
      </button>&nbsp;
      <button 
      type="submit" 
      className="btn btn-danger"
      onClick={this.onDelete}>
      <span className="fa fa-close mr-S"></span>Xóa
      </button>
        </td>
        </tr>


    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch, props) =>{
  return {
    onUpdateStatus: (id) =>{
      dispatch(action.updateStatus(id))
    },
    onDeleteTask: (id) =>{
      dispatch(action.deleteTask(id))
    },
    onCloseForm: () =>{
      dispatch(action.closeForm())
    },
    onOpenForm: () =>{
      dispatch(action.openForm());
    },
    onEditTask: (task) =>{
      dispatch(action.editTask(task));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
