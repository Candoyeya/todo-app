import React, { Component } from 'react';
import _ from 'lodash';
import fontsawesome from './../fontsawesome';

class CategoryCreateForm extends Component{
	render(){
		return(
			<div className="columns is-centered">
				<div className="column">
					<div className="hero is-light">
						<div className="hero-body">
							<div className="field is-grouped is-grouped-multiline">
								<div className="control is-expanded">
									<label htmlFor="title" className="label">Titulo <span className="small has-text-danger">*</span></label>
									<input name="title" id="title" type="text" className="input" value={this.state.title} onChange={this.handleChange} required/>
								</div>
								<div className="control">
									<label htmlFor="category" className="label">Icono <span className="small has-text-danger">*</span></label>
									<div className="control has-icons-left">
										<div className="select">
											<select name="icon" id="icon" value={this.state.icon} onChange={this.handleChange} required>
												<option value="">Seleccionar</option>
												{_.map(fontsawesome,(item,k) => {
													return(
														<option value={item} key={k}>{item}</option>
													)
												})}
											</select>
										</div>
										<div className="icon is-small is-left">
											<i className={`fa ${this.state.icon}`}></i>
										</div>
									</div>
								</div>
							</div>
							<div className="field">
								<div className="control">
									<label htmlFor="description" className="label">Descripción</label>
									<textarea name="description" id="description" cols="30" rows="5" className="textarea" value={this.state.description} onChange={this.handleChange}/>
								</div>
							</div>

							<div className="field is-grouped is-grouped-right">
								<div className="control">
									<button type="button" className="button is-danger" onClick={() => this.props.history.push('/categorias')}>
										Regresar
									</button>
								</div>
								<div className="control">
									<button type="button" className="button is-success" onClick={() => this.handleSubmit()}>
										Guardar
									</button>
								</div>
							</div>

							<p className="has-text-grey has-text-right is-small">Los campos indicados con <span className="small has-text-danger">*</span> son obligatorios.</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	constructor(props) {
		super(props);
		this.state = {
			id:'',
			title: '',
			description:'',
			icon:''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount(){
		if(!_.isEmpty(this.props.data)){
			this.setState({
				...this.props.data
			})
		}

	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit() {
		let categories = JSON.parse(localStorage.getItem('categories'));

		let count = categories.length;

		if(this.state.title !== ''){
			if(this.state.id){
				let index = _.findIndex(categories,{'id':this.state.id})
				categories[index]={
					...this.state,
				}
			}else {
				let newId = count + 1;

				if(count>0){
					newId = categories[count-1].id +1;
				}

				categories = [
					...categories,
					{...this.state,id: newId}
				];
			}
			localStorage.setItem('categories',JSON.stringify(categories));
			this.props.history.push('/categorias');
		}else {
			alert('Llenar los campos obligatorios');
		}
	}
}

export default CategoryCreateForm;