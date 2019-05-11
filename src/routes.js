import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './app';

import Welcome from './layouts/welcome/index';
//Tareas
import Tasks from './layouts/tasks/index';
import AddTask from './layouts/tasks/create';
import EditTask from './layouts/tasks/edit';
import TaskCategory from './layouts/tasks/categories';
//Categorias
import Categories from './layouts/categories/index';
import AddCategory from './layouts/categories/create';
import EditCategory from './layouts/categories/edit';

export default (
	<Route key="app" component={App}>
		<Switch>
			<Route key="welcome" path="/" exact component={(props) => (<Welcome {...props} />)}/>
			<Route key="taks" path="/tareas" exact component={(props) => (<Tasks {...props} />)}/>
			<Route key="addtask" path="/tareas/nueva" exact component={(props) => (<AddTask {...props} />)}/>
			<Route key="edittask" path="/tareas/editar/:id" exact component={(props) => (<EditTask {...props} />)}/>
			<Route key="taskscategory" path="/tareas/categoria/:id" exact component={(props) => (<TaskCategory {...props} />)}/>
			<Route key="categories" path="/categorias" exact component={(props) => (<Categories {...props} />)}/>
			<Route key="addcategory" path="/categorias/nueva" exact component={(props) => (<AddCategory {...props} />)}/>
			<Route key="editcategory" path="/categorias/editar/:id" exact component={(props) => (<EditCategory {...props} />)}/>
		</Switch>
	</Route>
);