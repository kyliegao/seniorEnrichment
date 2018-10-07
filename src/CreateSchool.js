import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createSchool } from './store'

class CreateSchool extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            address: '',
            description: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }            

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        const { createSchool } = this.props
        const school = this.state
        createSchool(school)
    }


    render(){
        const { name, address, description } = this.state
        const { handleChange, handleSubmit } = this

        return(
            <div>
                <h2>CreateSchool</h2>
                <form onChange = {handleChange} onSubmit = {handleSubmit}>
                    <label>Name: </label>
                    <input type = 'text' name = 'name' value = {name} />
                    <br />

                    <label>Address: </label>
                    <input type = 'text' name = 'address' value = {address} />
                    <br />


                    <label>Description: </label>
                    <input type = 'text' name = 'description' value = {description} />
                    <br />

                    <button type = 'submit'>Save</button>

                </form>
                <hr/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createSchool: (school) => dispatch(createSchool(school))
})

export default connect(null, mapDispatchToProps)(CreateSchool)