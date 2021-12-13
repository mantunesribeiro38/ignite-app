import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//SETUP REDUX
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnchancer(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>  ,
  document.getElementById('root')
);

reportWebVitals();
