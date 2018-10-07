import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editStudent, deleteStudent } from './store'

class ViewStudent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.id,
            firstName: '',
            lastName: '',
            gpa: 0,
            schoolId: null,
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
        e.preventDefault()
        const { editStudent, student } = this.props
        const { id, firstName, lastName, gpa, schoolId } = this.state
        let _schoolId

        if (schoolId === "None"){
            _schoolId = null
        } else if (schoolId == null){
            _schoolId = student.schoolId
        } else {
            _schoolId  = schoolId
        }

        console.log(student)
        editStudent({
            id: id? id : student.id,
            firstName: firstName ? firstName: student.firstName,
            lastName: lastName ? lastName: student.lastName,
            gpa: gpa ? gpa : student.gpa,
            schoolId: _schoolId
        })
    }
    
    render(){
        const { student, deleteStudent, schools, id } = this.props
        const { handleChange, handleSubmit } = this
        const none = null
        const currentSchool = schools.filter(school => school.id == student.schoolId)[0]
        
        const otherSchools = schools.filter(school => school.id !== student.schoolId)
        
        
        if(!student){
            return(<div>Loading</div>)
        } else {
        }
        return(
            <div>
                {student? student.firstName : <span> No student selected</span>}
                
                <form onChange = {handleChange} onSubmit = {handleSubmit}>
                
                    <label>First Name: </label>
                    <input type = 'text' name = 'firstName' defaultValue = {student.firstName} />
                    <br />

                    <label>Last Name: </label>
                    <input type = 'text' name = 'lastName' defaultValue = {student.lastName}/>
                    <br />

                    <label>GPA: </label>
                    <input type = 'text' name = 'gpa' defaultValue = {student.gpa}/>
                    <br />

                    <label>School: </label>
                    <select name = 'schoolId'>
                        {currentSchool?
                            <option key = {currentSchool.name} value = {currentSchool.id} >
                                {currentSchool.name}
                            </option>
                            :
                            <option key = 'no school' value = {none}>
                                None
                            </option>
                        }

                        {otherSchools.map(school => (
                            <option key = {school.name} value = {school.id}>
                                {school.name}
                            </option>
                        ))}

                        {currentSchool?
                            <option key = 'no school' value = {none}>
                                None
                            </option>
                            :
                            null
                        }


                    </select>

                    <button type = 'submit'>Save</button>
                    <button onClick = {() => {deleteStudent(id)}}>Delete</button>

                </form>


            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const studentId = +ownProps.match.params.id

    return({
        student: state.students.filter(student => (student.id == studentId))[0],
        schools: state.schools,
        id: studentId,
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        editStudent: (student) => dispatch(editStudent(student)),
        deleteStudent: (id) => {
            dispatch(deleteStudent(id))
            ownProps.history.push('/students')
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewStudent)