import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Switch, Redirect, Route, HashRouter as Router } from 'react-router-dom'
import Nav from './Nav'
import Schools from './Schools'
import Students from './Students'
import ViewSchool from './ViewSchool'
import ViewStudent from './ViewStudent'
import CreateStudent from './CreateStudent'
import CreateSchool from './CreateSchool'
import store, { fetchStudents, fetchSchools } from './store'


class Main extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { fetchSchools, fetchStudents }  = this.props
        fetchSchools()
        fetchStudents()
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))  // what does this code do?
    }

    componentWillUnmount(){
        this.unsubscribe()
    }
    // I don't understand subscribe & unsubscribe
    // /:id routes don't load after hard refresh; I suspect it's got to do with how I have mounted the store

    render(){
        const { isLoading } = this.props

        return(
            <Router>
                {isLoading ? 
                <div>Loading</div>
                :
                <div>
                    <h1>Special Schools List</h1>
                    <hr/>
                    <Nav />
                    <Route exact path='/students' component={Students} />
                    <Switch>
                        <Route exact path = '/students/create' component = {CreateStudent}/>
                        <Route exact path = '/students/:id' component = {ViewStudent} />
                    </Switch>
                    <Route exact path='/schools' component={Schools} />
                    <Switch>
                        <Route exact path = '/schools/create' component = {CreateSchool}/>
                        <Route exact path = '/schools/:id' component = {ViewSchool} />
                    </Switch>
                    {/* <Redirect from = '/' to = '/schools'/> */}
                </div>
                }
            </Router>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSchools: () => dispatch(fetchSchools()),
    fetchStudents: () => dispatch(fetchStudents())
})

const mapStateToProps = state => ({
    isLoading: state.isLoading.schools == true || state.isLoading.students == true ? true: false
})


export default connect(mapStateToProps, mapDispatchToProps)(Main)