import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';
import Routes from './routes';
import {history} from "./const";
import './assets/css/bulma.min.css';
import './assets/css/styles.css';
//import App from './App';
import serviceWorker from './serviceWorker';

const Root = () => (
	<Router history={history}>
		<Route children={Routes.props.children} />
	</Router>
)

render(
	<Root />,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker();
