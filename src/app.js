import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es';

export default class AppContainer extends Component {
	render() {
		return <div>{React.cloneElement(this.props.children, this.props)}</div>
	}
}