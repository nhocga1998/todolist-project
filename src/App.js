import React, { Component } from 'react';
import Control from './components/Control'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { connect } from 'react-redux'
import * as action from './actions/index'
import './App.css';

class App extends Component {
  
  onToggleForm = () => { //thêm task
    if (this.props.itemEditing && this.props.itemEditing.id !== '') {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });
  }


  render() {

    var { isDisplayForm } = this.props
    
    return (

      <div className="container">

        <div className="text-center">
          <h1>Quản lí công việc</h1> <hr />
        </div>

        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
            {/* form */}

            <TaskForm />

          </div>

          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
            : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="submit"
              className="btn btn-warning"
              onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm công việc
                  </button>


            {/* search sort */}

            <Control
            />

            {/* list */}

            <TaskList />

          </div>




        </div>

      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
    
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(action.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(action.editTask(task))
    },
    onOpenForm: () =>{
      dispatch(action.openForm());
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
