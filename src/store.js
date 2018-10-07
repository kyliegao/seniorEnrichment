import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'

//initial store set-up
const initialState = {
    schools: [],
    students: [],
    selectedId: {
        school: 0,
        student: 0
    },
    isLoading: {
        schools: false,
        students: false,
    },
}


//actions

const SCHOOLS = 'SCHOOLS'
const STUDENTS = 'STUDENTS'
const FETCH_DATA = 'FETCH_DATA'
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
const GOT_SCHOOLS = 'GOT_SCHOOLS'
const GOT_STUDENTS = 'GOT_STUDENTS'
const SELECTED_SCHOOL_ID = 'SELECTED_SCHOOL_ID'
const SELECTED_STUDENT_ID = 'SELECTED_STUDENT_ID'
const UPDATE_SCHOOLS = 'UPDATE_SCHOOLS'
const EDIT = 'EDIT'
const DELETE = 'DELETE'
const UPDATE_DELETED_STUDENT = 'UPDATE_DELETED_STUDENT'
const UPDATE_STUDENT_CHANGES = 'UPDATE_STUDENT_CHANGES'


//action creators

export const gotSchools = (schools) => ({
    type: GOT_SCHOOLS,
    schools
})

export const gotStudents = (students) => ({
    type: GOT_STUDENTS,
    students
})

export const selectStudentId = (id) => ({
    type: SELECTED_STUDENT_ID,
    id
})

export const selectSchoolId = (id) => ({
    type: SELECTED_SCHOOL_ID,
    id
})

export const fetchData = (dataType) => ({
    type: FETCH_DATA,
    dataType
})

export const fetchDataSuccess = (dataType) => ({
    type: FETCH_DATA_SUCCESS,
    dataType
})

export const updateSchools = (updatedSchool, editType) => ({
    type: UPDATE_SCHOOLS,
    updatedSchool,
    editType
})

export const updateDeletedStudent = (id) => ({
    type: UPDATE_DELETED_STUDENT,
    id,
})

export const updateStudentChanges = (updatedStudent) => ({
    type: UPDATE_STUDENT_CHANGES,
    updatedStudent 
})

//thunks

export const fetchSchools = () => {
    
    return (dispatch) => {
        dispatch(fetchData(SCHOOLS))
        axios.get('/api/schools')
        .then(res => {
            dispatch(gotSchools(res.data))
            dispatch(fetchDataSuccess(SCHOOLS))
        })
        .catch(ex => console.log(ex))
    }
}

 export const fetchStudents = () => {
     return (dispatch) => {
        dispatch(fetchData(STUDENTS))
        axios.get('api/students')
        .then(res => {
            dispatch(gotStudents(res.data))
            dispatch(fetchDataSuccess(STUDENTS))
        })
        .catch(ex => console.log(ex))
    }
}

export const editSchools = (data) => {
    return (dispatch) => {
        axios.put(`api/schools/${data.id}`, data)
        .then(res => {
            dispatch(updateSchools(res.data, EDIT))
        })
        .catch(ex => console.log(ex))
    }
}

export const deleteSchool = (id) => {
    return (dispatch) => {
        axios.delete(`api/schools/${id}`)
        .then( () => {
            dispatch(updateSchools({id:id}, DELETE))
        })
        .catch(ex => console.log(ex))
    }
}

export const deleteStudent = (id) => {
    return (dispatch) => {
        axios.delete(`api/students/${id}`)
        .then (() => dispatch(fetchStudents()))
        .catch(ex => console.log(ex))
    }
}

export const editStudent = (data) => {
    return (dispatch) => {
        console.log(data)
        axios.put(`api/students/${data.id}`, data)
        .then(res => dispatch(fetchStudents()))
        .catch(ex => console.log(ex))
    }
}

export const createStudent = (student) => {
    return (dispatch) => {
        axios.post('api/students', student)
        .then(() => dispatch(fetchStudents()))
        .catch(ex => console.log(ex))
    }
}

export const createSchool = (school) => {
    return(dispatch) => {
        axios.post('api/schools', school)
        .then(() => dispatch(fetchSchools()))
        .catch(ex => console.log(ex))
    }
}


// reducers

const schools = (state = initialState.schools, action) => {
    switch (action.type){
        case GOT_SCHOOLS:
            return action.schools
        
        case UPDATE_SCHOOLS:
            const newSchoolsList = state.filter(school => school.id !== action.updatedSchool.id)
            if (action.editType === EDIT){
                return newSchoolsList.concat(action.updatedSchool)
            } else return newSchoolsList

        default:
            return state
    }
}


const students = (state = initialState.students, action) => {
    switch (action.type){
        case GOT_STUDENTS:
            return action.students
        
        case UPDATE_DELETED_STUDENT:
            return state.filter(student => student.id !== action.id)

        case UPDATE_STUDENT_CHANGES:
            return state.filter(student => student.id != action.updatedStudentid).concat(action.updatedStudent)

        default:
            return state
    }
}

const selectedId = (state = initialState.selectedId, action) => {
    switch(action.type){
        case SELECTED_SCHOOL_ID:
            console.log('selected school id')
            return {...state, school: action.id}
        case SELECTED_STUDENT_ID:
            return {...state, student: action.id}
        default:
            return state
    }
}

const isLoading = (state = initialState.isLoading, action)=> {
    switch(action.type){
        case FETCH_DATA:
            console.log(action.dataType)
            if(action.dataType === SCHOOLS){
                return {...state, schools: true}
            } else {
                return {...state, students: true}
            }

        case FETCH_DATA_SUCCESS:
            if(action.dataType === SCHOOLS){
                console.log('looking in schools')
                return {schools: false, students: state.students}
            } else {
                return {...state, students: false}
            }

        default:
            return state
    }
}


const reducer = combineReducers({ schools , students, selectedId, isLoading })



// initialize the store

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))