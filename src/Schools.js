import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectSchoolId } from './store';

class Schools extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const { schools, selectSchool } = this.props

        return(
            <div>
                <h2>Schools</h2>
                <ul>
                {schools.map(school => (
                    <li key = {school.name}>
                        <Link to = {`/schools/${school.id}`}>
                            <span onClick = {() => selectSchool(school.id)}>
                                {school.name} 
                            </span>
                        </Link>
                        {school.students}
                    </li>
                )
                )}
                </ul>
                
                <Link to = {'/schools/create'}>
                    <button>Create School</button>
                </Link>

                <hr/>
            </div>
        )
    }
}


const mapStateToProps = state => {

    const schoolsWithStudents = state.schools.map(school => {
        let students = state.students.filter(student => {
            return student.schoolId === school.id
        }).length
        return {...school, students: students}
    })
   
    return({
        schools: schoolsWithStudents
    })
}

const mapDispatchToProps = dispatch => ({
    selectSchool: (id) => dispatch(selectSchoolId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Schools)