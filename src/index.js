import React from 'react';
import ReactDOM from 'react-dom';
import BootStrap from '../node_modules/bootstrap/dist/css/bootstrap.css';
//import FontAwesome from '../node_modules/font-awesome/css/font-awesome.min.css';
import BookApp from './containers/BookApp';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import threadReducer from "./reducers/ThreadReducer"
import {CookiesProvider} from "react-cookie"


const rootReducer = combineReducers({
    threads: threadReducer
  })
  
  const store = createStore(rootReducer)
  

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <BookApp/>
        </Provider>
    </CookiesProvider>,
document.getElementById('root'));
