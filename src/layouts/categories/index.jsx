import React, { Component } from 'react';
import BaseLayout from '../../template/base';
import _ from 'lodash';

class Categories extends Component{
	render(){
		const {tasks,categories} = this.props;
		return(
			<div className="columns is-centered">
				<div className="column">
					<div className="hero is-light">
						<div className="hero-body">
							<div className="field is-grouped is-grouped-right">
								<div className="control">
									<button type="button" className="button is-success is-rounded" onClick={() => this.props.history.push('/categorias/nueva')}>
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
							{_.map(_.orderBy(categories,['id'],['asc']),(row,k) => {
								//let category = _.find(categories,{'id': row.category});
								let count = 0,  complete=0;
								_.map(tasks,(item) => {
									if(row.id === item.category){
										count ++;
										if(item.complete){
											complete ++;
										}
									}
								})
								return(
									<div className="level box" key={k}>
										<div className="level-item has-text-centered">
											<p><strong>Categoria:</strong>&nbsp;{row.title}</p>
										</div>
										<div className="level-item has-text-centered">
											<p><strong>Icono:</strong>&nbsp;<span className="icon"><i className={`fa ${row.icon}`}/></span></p>
										</div>
										<div className="level-item has-text-centered">
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
										<div className="level-item has-text-centered">
											<div className="field is-grouped">
												<div className="control">
													<button type="button" className="button is-info" onClick={() => this.props.history.push(`/categorias/editar/${row.id}`)}><i className="fa fa-edit" /></button>
												</div>
												<div className="control">
													<button type="button" className="button is-danger" onClick={() => this._delete(row.id)}><i className="fa fa-trash" /></button>
												</div>

											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}

	_delete(id){
		const {categories} = this.props;
		_.remove(categories,item=> item.id === id);
		console.log('===>',categories);
		localStorage.setItem('categories',JSON.stringify(categories));
		this.props.history.push('/categorias');

	}
}

export default BaseLayout(Categories,{title:'Lista de categorias'})