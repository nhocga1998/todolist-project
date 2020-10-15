import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as action from '../actions/index'

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.itemEditing) {
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status
      });
    }else{
      this.onClear();
    } 
  }

  UNSAFE_componentWillReceiveProps = (nextprops) => {
    if (nextprops && nextprops.itemEditing) {
      this.setState({
        id: nextprops.itemEditing.id,
        name: nextprops.itemEditing.name,
        status: nextprops.itemEditing.status
      });
      console.log(this.state);
    }else{
      this.onClear();
    } 
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === 'status') {
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSaveTask(this.state)
    
    //this.onClear();
    this.onCloseForm();
    
  }

  onClear = () => {
    console.log(this.state.id)
    this.props.onClearTask({
      id: this.state.id,
      name: '',
      status: false
    })

  }
  render() {
    
    if(!this.props.isDisplayForm) return null;
    return (

      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.id !== '' ? 'cập nhật công việc' : 'Thêm công việc'}
            <span className="fa fa-times-circle text-right">

            </span>
            <button
              type="submit"
              className="btn btn-warning"
              onClick={this.onCloseForm}>
              <span className="fa fa-plus mr-S"></span>Đóng
            </button>
          </h3>
        </div>
        <div className="panel-body">

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên: </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng thái</label>

            <select
              name="status"
              className="form-control"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích hoạt</option>
              <option value={false}>Ẩn</option>
            </select><br />

            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <span className="fa fa-plus mr-S"></span>Lưu lại
            </button>&nbsp;
            <button
                type="button"
                className="btn btn-danger"
                onClick={this.onClear}>
                <span className="fa fa-close mr-S"></span>Hủy bỏ
            </button>
            </div>




          </form>

        </div>
      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing

  }
}

const mapDispatchToProps = (dispatch, props) =>{
  return {
    onSaveTask : (task) => {
      dispatch(action.saveTask(task))
    },
    onCloseForm: () =>{
      dispatch(action.closeForm())
    },
    onClearTask: (task) => {
      dispatch(action.editTask(task))
    },
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
