import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Schools from './Schools'
import Students from './Students'

class Nav extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { schools, students } = this.props

        return(
            <div>
                <h3>
                    <Link to = '/schools'>Schools {schools.length}</Link>
                    <br/>
                    <Link to = '/students'>Students {students.length}</Link>
                </h3>
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    schools: state.schools,
    students: state.students
})


export default connect(mapStateToProps)(Nav)