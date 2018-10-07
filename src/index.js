import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Main from './Main'

ReactDOM.render(
    <Provider store={ store }>
            <Main />
    </Provider>
    ,
    document.getElementById('app')
)
