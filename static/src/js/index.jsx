import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import UserStore from './UserStore';


render(<App store={UserStore}/>, document.getElementById('app'));