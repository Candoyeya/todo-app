import React, { Component } from 'react';
import BaseLayout from '../../template/base';
import _ from 'lodash';

class Welcome extends Component {
	render(){
		const {tasks,categories} = this.props;
		let countTasks = 0;
		let countTasksTotal = 0,  tasksComplete=0;
		_.map(tasks,(item) => {
			countTasksTotal ++;
			if(item.complete){
				tasksComplete ++;
			}
		})
		return (
			<div className="columns is-centered">
				<div className="column">
					<div className="hero">
						<div className="hero-body">
							<div className="field is-grouped is-grouped-multiline is-grouped-right">
								<div className="control">
									<button type="button" className="button is-success is-rounded" onClick={() => this.props.history.push('/tareas/nueva')}>
										<span className="icon">
											<i className="fa fa-plus"/>
										</span>
										<span>
											Nueva Tarea
										</span>
									</button>
								</div>
								<div className="control">
									<button type="button" className="button is-info is-rounded" onClick={() => this.props.history.push('/tareas')}>
										<span className="icon">
											<i className="fa fa-list-alt"/>
										</span>
										<span>
											Lista de tareas
										</span>
									</button>
								</div>
								<div className="control">
									<button type="button" className="button is-link is-rounded" onClick={() => this.props.history.push('/categorias')}>
										<span className="icon">
											<i className="fa fa-sliders"/>
										</span>
										<span>
											Lista de categorias
										</span>
									</button>
								</div>
							</div>
							<div className="columns is-multiline">
								<div className="column is-one-quarter" key="todas">
									<div className="card" style={{cursor:'pointer'}} onClick={() => this.props.history.push('/tareas')}>
										<div className="card-content">
											<div className="media">
												<div className="media-left">
														<span className="icon">
															<i className="fa fa-list-alt"/>
														</span>
												</div>
												<div className="media-content">
													<p className="title is-5">
														Todas
													</p>
												</div>
											</div>
											<div className="content">
												<div className="field is-grouped is-grouped-multiline">
													<div className="control">
														<div className="tags has-addons">
															<span className="tag is-info">Total tareas</span>
															<span className="tag is-primary">{countTasksTotal}</span>
														</div>
													</div>
													<div className="control">
														<div className="tags has-addons">
															<span className="tag is-info">Total pendientes</span>
															<span className="tag is-warning">{countTasksTotal>tasksComplete ? countTasksTotal-tasksComplete:0}</span>
														</div>
													</div>
													<div className="control">
														<div className="tags has-addons">
															<span className="tag is-info">Total completas</span>
															<span className="tag is-success">{tasksComplete}</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								{!_.isEmpty(categories) ?
									_.map(categories,(row,k)=> {
										let count = 0,  complete=0;
										_.map(tasks,(item) => {
											if(row.id === item.category){
												count ++;
												if(item.complete){
													complete ++;
												}
											}
										})
										return (
											<div className="column is-one-quarter" key={k}>
												<div className="card" style={{cursor:'pointer'}} onClick={() => this.props.history.push(`/tareas/categoria/${row.id}`)}>
													<div className="card-content">
														<div className="media">
															<div className="media-left">
														<span className="icon">
															<i className={`fa ${row.icon}`}/>
														</span>
															</div>
															<div className="media-content">
																<p className="title is-5">
																	{row.title}
																</p>
															</div>
														</div>
														<div className="content">
															<div className="field is-grouped is-grouped-multiline">
																<div className="control">
																	<div className="tags has-addons">
																		<span className="tag is-info">Total tareas</span>
																		<span className="tag is-primary">{count}</span>
																	</div>
																</div>
																<div className="control">
																	<div className="tags has-addons">
																		<span className="tag is-info">Total pendientes</span>
																		<span className="tag is-warning">{count>complete ? count-complete:0}</span>
																	</div>
																</div>
																<div className="control">
																	<div className="tags has-addons">
																		<span className="tag is-info">Total completas</span>
																		<span className="tag is-success">{complete}</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										)
									}) :''
								}
								<div className="column is-one-quarter" key="add-category">
									<div className="card" style={{cursor:'pointer'}} onClick={() => this.props.history.push('/categorias/nueva')}>
										<div className="card-content">
											<div className="media">
												<div className="media-left">
														<span className="icon">
															<i className="fa fa-plus"/>
														</span>
												</div>
												<div className="media-content">
													<p className="title is-5">
														Agregar Categoria
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="container box">
								<h5 className="title">Tareas por vencer</h5>
								{!_.isEmpty(_.filter(tasks,item => item.complete !== 1)) ?
									_.map(_.orderBy(_.filter(tasks,item => item.complete !== 1),['expirationDate'],['desc']),(row,k) => {
										let category = _.find(categories,{'id': row.category});
										if(countTasks<=10){
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
															<span className="small has-text-danger">Pendiente</span>}
														</p>

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
																<button type="button" className="button is-danger"><i className="fa fa-trash" /></button>
															</div>

														</div>
													</div>
												</div>
											)
										}
									}):<div className="level box">
										<div className="level-item">
											<h5 className="title">
												No hay tareas por vencer
											</h5>
										</div>
									</div>}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
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

export default BaseLayout(Welcome,{title:'Tablero'});