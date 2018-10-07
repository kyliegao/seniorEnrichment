import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStudent } from './store'

class CreateStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            gpa: 0,
            schoolId: 1
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const { createStudent } = this.props
        const student = this.state
        createStudent(student)
    }

    render(){
        const { firstName, lastName, gpa} = this.state
        const { schools, selectedSchool } = this.props
        const { handleChange, handleSubmit } = this
        let schoolsList = []

        if(selectedSchool){
            schoolsList = schools.filter(school => school.id !== selectedSchool.id)
        } else {
            schoolsList = schools
        }

        return(
            <div>
                <h2>CreateStudent</h2>
                <form onSubmit = {handleSubmit} onChange = {handleChange}>

                    <label htmlFor = 'firstName'>First Name:</label>
                    <input type = 'text' name = 'firstName' value = {firstName} onChange = {handleChange}/>
                    <br/>

                    <label htmlFor = 'lastName'>Last Name:</label>
                    <input type = 'text' name = 'lastName' value = {lastName}/>
                    <br/>

                    <label htmlFor = 'gpa'>gpa:</label>
                    <input type = 'text' name = 'gpa' value = {gpa}/>
                    <br/>

                    <label htmlFor = 'school'>school:</label>
                    <select name = 'schoolId'>
                    {selectedSchool? 
                        <option key = {selectedSchool.id} value = {selectedSchool.id}>
                            {selectedSchool.name}
                        </option>
                        :
                        null
                    }
                    {schoolsList.map (school => (
                        <option key = {school.id} value = {school.id}>
                            {school.name}
                        </option>
                    ))}
                    </select>
                    <br/>

                    <button type = 'submit'>Create</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps)
    // console.log(ownProps.location.state.school)
    let selectedSchool 

    if (ownProps.location.state){
        selectedSchool = ownProps.location.state.school
    } else {
        selectedSchool = null
    }

    return {
        schools: state.schools,
        selectedSchool: selectedSchool
    }
}

const mapDispatchToProps = dispatch => ({
    createStudent: (student) => dispatch(createStudent(student))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)