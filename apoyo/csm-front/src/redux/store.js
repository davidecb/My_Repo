import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers';

/* const logger = (store) => (next) => (action) => {
    console.log("@STATE:",store.getState());
    next(action);
} */
const composeEnhancers = composeWithDevTools({
    name: 'Redux',
    realtime: true,
    trace: true,
    traceLimit: 20
});

const store = createStore(
            rootReducer,    
            composeEnhancers(
                applyMiddleware(logger)
            ));
    
export default store