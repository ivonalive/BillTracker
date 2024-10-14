import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';  // Add this import
import logger from 'redux-logger';
import rootReducer from './reducers/_root.reducer';
import rootSaga from './sagas/_root.saga';

const sagaMiddleware = createSagaMiddleware();

const middlewareList = process.env.NODE_ENV === 'development' 
  ? [sagaMiddleware, thunk, logger]  // Add thunk here
  : [sagaMiddleware, thunk];  // And here

const enhancer = compose(
  applyMiddleware(...middlewareList),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;