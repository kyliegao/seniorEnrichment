import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectStudentId, selectSchoolId } from './store'
import Schools from './Schools';

class Students extends Component{
    constructor(props){
        super(props)
    }


    render(){
        const { students, selectSchool, selectStudent } = this.props
        const none = 'school is not for everyone'

        return(
            <div>
                <h2>Students</h2>
                <ul>
                    {students.map(student => (
                        <li key = {student.firstName}>
                            <Link to = {`/students/${student.id}`} onClick = {() => selectStudent(student.id)}>
                                {student.firstName.concat(' ')}{student.lastName.concat(' ')}
                            </Link>
                                [{student.school? 
                                    <Link to = {`/schools/${student.school.id}`}>
                                        <span onClick = {() => selectSchool(student.school.id)}>
                                            {student.school.name}
                                        </span>
                                    </Link>
                                    : none
                                }]
                        </li>
                    ))}
                </ul>
                
                <Link to = {'/students/create'}>
                    <button>Create Student</button>
                </Link>

                <hr/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    students: state.students
})

const mapDispatchToProps = dispatch => ({
    selectSchool: (id) => dispatch(selectSchoolId(id)),
    selectStudent: (id) => dispatch(selectStudentId(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Students)
