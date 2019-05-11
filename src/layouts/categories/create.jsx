import React, { Component } from 'react';
import BaseLayout from '../../template/base';
import CategoryCreateForm from './../../components/categories/form';

class CategoryEdit extends Component{
	render() {
		return <CategoryCreateForm  {...this.props}/>
	}
}

export default BaseLayout(CategoryEdit,{title:'Nueva categoria'})