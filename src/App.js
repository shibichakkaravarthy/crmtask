import React from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import ReactNotification from 'react-notifications-component'

import Reducers from './Redux/Reducers'
import { MenuBar, Header } from './Components'
import { Contacts } from './Screens'
import './styles.css';

function App() {
  const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk))
  return (
    <Provider store={store}  >
      <ReactNotification />
      <div className="App">
        <div className="menu">
          <MenuBar />
        </div>
        <div className="screens">
          <Header />
          <Contacts />
        </div>
      </div>
    </Provider>
  );
}

export default App;
