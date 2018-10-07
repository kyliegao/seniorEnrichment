import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editSchools, deleteSchool, deleteStudent, editStudent } from './store';

class ViewSchool extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            address: '',
            studentId: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeStudent = this.handleChangeStudent.bind(this)
        this.handleSubmitStudent = this.handleSubmitStudent.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    } 

    handleSubmit(e){
        e.preventDefault()
        const { name, description, address } = this.state
        const { editSchools, school } = this.props

        editSchools({
            id: school.id,
            name: name? name : school.name,
            description: description? description : school.description,
            address: address ? address: school.address
        })
    }

    handleChangeStudent(e){
        this.setState({
            studentId: e.target.value
        })
    }

    handleSubmitStudent(e){
        e.preventDefault()

        const { studentId } = this.state
        const { editStudent, school } = this.props

        editStudent({
            id: studentId,
            schoolId: school.id,
        })
        
    }


    render() {
        const { school, students, deleteSchool, editStudent, allStudents } = this.props
        const { handleChange, handleSubmit, handleSubmitStudent, handleChangeStudent} = this
        // const school = this.props.schools.filter(el => el.id === +this.props.match.params.id)[0]
        console.log('loooook herereee', school)
        console.log('school', this.props)
        if(!school) {
            return (<div>Loading</div>)
        }
        return(
            <div>
                <form onSubmit = {handleSubmit}>
                    <label htmlFor = 'name'>Name:</label>
                    <input type = 'text' name = 'name' defaultValue = {school.name} onChange = {handleChange}/>
                    <br/>

                    <label htmlFor = 'description'>Description:</label>
                    <input type = 'text' name = 'description' defaultValue = {school.description} onChange = {handleChange}/>
                    <br/>

                    <label htmlFor = 'address'>Address:</label>
                    <input type = 'text' name = 'address' defaultValue = {school.address} onChange = {handleChange}/>
                    <br/>
                    
                    <button type = 'submit'>save</button>
                    <button  onClick = {() => deleteSchool(school.id)}>delete</button>
                </form>

                
                <label htmlFor = 'students'>Students:</label>
                <ul>
                    {students.map(student => (
                        <li key = {student.firstName}>{student.firstName}<button onClick = {() => editStudent({id: student.id, schoolId: null})}>x</button> </li>
                        )
                    )}
                </ul>

                <form onSubmit = {handleSubmitStudent} onChange = {handleChangeStudent}>    
                    <label>Add Student: </label>
                    <select name = 'student'>
                        <option value = ""> -- </option>
                        {allStudents.map(student => (
                            <option 
                            key = {student.firstName}
                            value = {student.id}
                            >
                            {student.firstName}
                            </option>
                        ))}
                    </select>
                    <button type = 'submit'>+</button>    
                </form>

                    <Link to = {{pathname: '/students/create', state: {school: school}}}>
                        <button>Create Student</button>
                    </Link>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const schoolId = +ownProps.match.params.id
    
    return {
        // schools: state.schools,
        school: state.schools.filter(school => (school.id === schoolId))[0],
        students: state.students.filter(student => (student.schoolId == schoolId)),
        allStudents: state.students.filter(student => (student.schoolId !== schoolId)),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editSchools: (data) => dispatch(editSchools(data)),
        deleteSchool: (id) => { 
            dispatch(deleteSchool(id))
            ownProps.history.push('/schools')
        },
        deleteStudent: (id) => dispatch(deleteStudent(id)),
        editStudent: (data) => dispatch(editStudent(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSchool)