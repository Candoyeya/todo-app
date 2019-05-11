import React, { Component } from 'react';
import BaseLayout from '../../template/base';
import CategoryCreateForm from './../../components/categories/form';
import _ from 'lodash';

class CategoryEdit extends Component{
	render() {
		const {categories,match} = this.props;
		return <CategoryCreateForm data={_.find(categories,{'id':_.toNumber(match.params.id)})} {...this.props}/>
	}
}

export default BaseLayout(CategoryEdit,{title:'Editar categoria'})