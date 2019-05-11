import React, { Component } from 'react';
import BaseLayout from '../../template/base';
import _ from 'lodash';

class TasksCategory extends Component{
	render(){
		const {categories} = this.props;
		let foundCategory = _.find(categories,{'id': _.toNumber(this.props.match.params.id)});
		return(
			<div className="columns is-centered">
				<div className="column">
					<div className="hero is-light">
						<div className="hero-body">
							{!_.isEmpty(foundCategory) ? <h3 className="title">
								<span className="icon">
									<i className={`fa ${foundCategory.icon}`}/>
								</span>&nbsp;
								<span>{foundCategory.title}</span>
							</h3>:''}
							<div className="field is-grouped is-grouped-multiline is-grouped-right">
								<div className="control">
									<button type="button" className="button is-success is-rounded" onClick={() => this.props.history.push('/tareas/nueva')}>
										<span className="icon">
											<i className="fa fa-plus"/>
										</span>
										<span>
											Nueva
										</span>
									</button>
								</div>
								<div className="control">
									<button type="button" className="button is-info is-rounded" onClick={() => this.props.history.push('/')}>
										<span className="icon">
											<i className="fa fa-arrow-left"/>
										</span>
										<span>
											Regresar
										</span>
									</button>
								</div>
							</div>
							<div className="field is-grouped is-grouped-multiline is-grouped-left">
								<div className="control">
									<button type="button" className="button is-info is-rounded" onClick={() => this.setState({type:0})}>
										<span className="icon">
											<i className="fa fa-list-alt"/>
										</span>
										<span>
											Todas
										</span>
									</button>
								</div>
								<div className="control">
									<button type="button" className="button is-success is-rounded" onClick={() => this.setState({type:1})}>
										<span className="icon">
											<i className="fa fa-check-square"/>
										</span>
										<span>
											Completas
										</span>
									</button>
								</div>
								<div className="control">
									<button type="button" className="button is-warning is-rounded" onClick={() => this.setState({type:2})}>
										<span className="icon">
											<i className="fa fa-square-o"/>
										</span>
										<span>
											Pendientes
										</span>
									</button>
								</div>
							</div>
							{!_.isEmpty(this._tasks(this.state.type)) ?
								_.map(_.orderBy(this._tasks(this.state.type),['expirationDate'],['desc']),(row,k) => {
									let category = _.find(categories,{'id': row.category});
									return(
										<div className="level box" key={k}>
											<div className="level-item has-text-centered">
												<p><strong>Tarea:</strong>&nbsp;{row.title}</p>
											</div>
											<div className="level-item has-text-centered">
												<p><strong>Categoria:</strong>&nbsp;{!_.isEmpty(category) ? category.title:'Categoria borrada'}</p>
											</div>
											<div className="level-item has-text-centered">
												<p><strong>Vence:</strong>&nbsp;{row.expirationDate}</p>
											</div>
											<div className="level-item has-text-centered">
												<p><strong>Estatus:</strong>&nbsp;{row.complete ?
													<span className="small has-text-success">Completado</span>:
													<span className="small has-text-danger">Pendiente</span>}</p>

											</div>
											<div className="level-item has-text-centered">
												<div className="field is-grouped">
													<div className="control">
														<button type="button" className="button is-success" disabled={row.complete} onClick={() => this._completeTask(row.id)}><i className="fa fa-check" /></button>
													</div>
													<div className="control">
														<button type="button" className="button is-info" onClick={() => this.props.history.push(`/tareas/editar/${row.id}`)}><i className="fa fa-edit" /></button>
													</div>
													<div className="control">
														<button type="button" className="button is-danger" onClick={() => this._delete(row.id)}><i className="fa fa-trash" /></button>
													</div>

												</div>
											</div>
										</div>
									)
								})
								:<div className="level box">
									<div className="level-item">
										<h5 className="title">
											No hay tareas agregadas
										</h5>
									</div>
								</div>}
						</div>
					</div>
				</div>
			</div>
		)
	}

	constructor(props) {
		super(props);
		this.state = {
			type:0
		};
	}

	_tasks(type){
		//let taskCategories = _.filter(_.filter(this.props.tasks,{'complete':1}),{'category':_.toNumber(this.props.match.params.id)});
		let tasks = [];
		if(type===1){
			tasks = _.filter(_.filter(this.props.tasks,{'complete':1}),{'category':_.toNumber(this.props.match.params.id)});
		}else if(type === 2){
			tasks = _.filter(_.filter(this.props.tasks,{'complete':0}),{'category':_.toNumber(this.props.match.params.id)});
		}else {
			tasks = _.filter(this.props.tasks,{'category':_.toNumber(this.props.match.params.id)});
		}

		return tasks
	}

	_delete(id){
		const {tasks} = this.props;
		_.remove(tasks,item=> item.id === id);
		//console.log('===>',tasks);
		localStorage.setItem('tasks',JSON.stringify(tasks));
		this.props.history.push('/tareas');

	}

	_completeTask(id){
		const {tasks} = this.props;
		let index = _.findIndex(tasks,{'id':id})
		tasks[index]={
			...tasks[index],
			complete: 1,
		}
		localStorage.setItem('tasks',JSON.stringify(tasks));
		this.props.history.push('/');
	}
}

export default BaseLayout(TasksCategory,{title:'Lista de tareas por categoria'})