import React, { Component } from 'react';
import BaseLayout from '../../template/base';
import TaskCreateForm from './../../components/tasks/form';

class TaskCreate extends Component{
	render() {
		return <TaskCreateForm categories={this.props.categories} {...this.props}/>
	}
}

export default BaseLayout(TaskCreate,{title:'Nueva tarea'})