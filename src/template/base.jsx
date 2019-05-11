import React, {Component} from 'react';
import _ from 'lodash';

export default function (SecuredComponent,data) {
	class BaseLayout extends Component {
		render(){
			return (
				<div className="container"><br/>
					<div className="box">
						<h1 className="title">
							{data.title}
						</h1>
					</div>
					<div className="content">
						<SecuredComponent {...this.props} tasks={this.state.tasks} categories={this.state.categories}/>
					</div>

				</div>
			)
		}

		constructor() {
			super();
			this.state = {
				tasks: [],
				categories: []
			}
		}

		componentWillMount(){
			let tasks = !_.isEmpty(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')):[];
			let categories = !_.isEmpty(localStorage.getItem('categories')) ?
				JSON.parse(localStorage.getItem('categories')):[
					{id:1,title:'General',icon:'fa-list',description:''},
					{id:2,title:'Trabajo',icon:'fa-building',description:''},
					{id:3,title:'Junta',icon:'fa-users',description:''},
					{id:4,title:'Casa',icon:'fa-home',description:''},
					{id:5,title:'Tiempo libre',icon:'fa-bicycle',description:''}
					];
			if(_.isEmpty(localStorage.getItem('tasks'))){
				localStorage.setItem('tasks',JSON.stringify(tasks));
			}

			if(_.isEmpty(localStorage.getItem('categories'))){
				localStorage.setItem('categories',JSON.stringify(categories));
			}
			this.setState({
				tasks: tasks,
				categories: categories
			})
		}
	}

	return BaseLayout;
}