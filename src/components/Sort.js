import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as action from '../actions/index'

class Sort extends Component {


    onClick = (sortBy,sortValue) =>{
        
        
        this.props.onSort({
            by: sortBy,
            value: sortValue
        });
    }

    render() {
        return (


            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">

                    <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >Sắp xếp</button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name',1)}>
                            <a 
                            role="button" 
                            >
                                Tên A-Z
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name',-1)}>
                            <a role="button"
                            >
                                Tên Z-A
                            </a>
                        </li>
                        <li role="seperator" className="divider"></li>
                        <li onClick={() => this.onClick('status',1) }>
                            <a role="button"
                            >
                                Trạng thái kích hoạt
                            </a>
                        </li>
                        <li onClick={() => this.onClick('status',-1) }>
                            <a role="button"
                            >
                                Trạng thái ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>



        );
    }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort
    };
  }
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onSort: (sort) => {
        dispatch(action.sortTask(sort));
      }
  
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
