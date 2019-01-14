import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/global.css';
import App from './Components/App';
import { Provider } from 'react-redux'
import { store } from './Redux/reducers';

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));


