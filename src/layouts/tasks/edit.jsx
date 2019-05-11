import React, { Component } from 'react';
import BaseLayout from '../../template/base';
import TaskCreateForm from './../../components/tasks/form';
import _ from 'lodash';

class TaskCreate extends Component{
	render() {
		const {tasks,categories,match} = this.props;
		return <TaskCreateForm data={_.find(tasks,{'id':_.toNumber(match.params.id)})} categories={categories} {...this.props}/>
	}
}

export default BaseLayout(TaskCreate,{title:'Editar tarea'})