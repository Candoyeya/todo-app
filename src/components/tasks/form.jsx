import React, { Component } from 'react';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import _ from 'lodash';

class TaskCreateForm extends Component{
	render(){
		const {categories} = this.props;
		return(
			<div className="columns is-centered">
				<div className="column">
					<div className="hero is-light">
						<div className="hero-body">

							<div className="field">
								<div className="control">
									<label htmlFor="category" className="label">Categoria <span className="small has-text-danger">*</span></label>
									<div className="select">
										<select name="category" id="category" value={this.state.category} onChange={this.handleChange} required>
											<option value="">Seleccionar</option>
											{_.map(categories,(item,k) => {
												return(
													<option value={item.id} key={k}>{item.title}</option>
												)
											})}
										</select>
									</div>
								</div>
							</div>
							<div className="field is-grouped is-grouped-multiline">
								<div className="control is-expanded">
									<label htmlFor="title" className="label">Titulo <span className="small has-text-danger">*</span></label>
									<input name="title" id="title" type="text" className="input" value={this.state.title} onChange={this.handleChange} required/>
								</div>
								<div className="control">
									<label htmlFor="expirationDate" className="label">Fecha de vencimiento <span className="small has-text-danger">*</span></label>

									<DatePicker
										name="expirationDate"
										id="expirationDate"
										//selected={this.state.expirationDate }
										onChange={(value) => this.handleChangeDate(value ? moment(value).format('YYYY-MM-DD'):"")}
										placeholderText={moment().format('YYYY-MM-DD')}
										className="input"
										value={this.state.expirationDate}
										dateFormat="YYYY-MM-DD"
										isClearable={true}
										required
									/>
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
									<button type="button" className="button is-danger" onClick={() => this.props.history.push('/tareas')}>
										Regresar
									</button>
								</div>
								<div className="control">
									<button type="button" className="button is-success" disabled={this.state.complete} onClick={() => this.handleSubmit()}>
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
			expirationDate:'',
			description:'',
			category:'',
			complete: 0
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

	handleChangeDate(value) {
		this.setState({expirationDate: value});
	}

	handleSubmit() {
		let tasks = JSON.parse(localStorage.getItem('tasks'));

		let count = tasks.length;

		if(this.state.title !== '' && this.state.expirationDate !== '' && this.state.category !== ''){
			if(this.state.id){
				let index = _.findIndex(tasks,{'id':this.state.id})
				tasks[index]={
					...this.state,
					category: _.toNumber(this.state.category),
				}
			}else {
				let newId = count + 1;

				if(count>0){
					newId = tasks[count-1].id +1;
				}

				tasks = [
					...tasks,
					{
						...this.state,
						id: newId,
						category: _.toNumber(this.state.category),
						complete:0,
						createDate:moment().format('YYYY-MM-DD')}
				];
			}
			localStorage.setItem('tasks',JSON.stringify(tasks));
			this.props.history.push('/tareas');
		}else {
			alert('Llenar los campos obligatorios');
		}
	}
}

export default TaskCreateForm;