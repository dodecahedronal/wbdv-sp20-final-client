import React from 'react';
import ReactDOM from 'react-dom';
import BootStrap from '../node_modules/bootstrap/dist/css/bootstrap.css';
//import FontAwesome from '../node_modules/font-awesome/css/font-awesome.min.css';
import BookApp from './containers/BookApp';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
<<<<<<< HEAD
import threadReducer from "./reducers/ThreadReducer";
import reviewReducer from "./reducers/reviewReducer";
=======
import threadReducer from "./reducers/ThreadReducer"
import commentReducer from "./reducers/CommentReducer"
>>>>>>> f86e9d4311a125eba1979d38890829f068b9d5ed
import {CookiesProvider} from "react-cookie"


const rootReducer = combineReducers({
    threads: threadReducer,
<<<<<<< HEAD
    reviews: reviewReducer,
=======
    comments: commentReducer
>>>>>>> f86e9d4311a125eba1979d38890829f068b9d5ed
  })
  
  const store = createStore(rootReducer)
  

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <BookApp/>
        </Provider>
    </CookiesProvider>,
document.getElementById('root'));
