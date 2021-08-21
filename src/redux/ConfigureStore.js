import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import post from './modules/post';
import question from './modules/question';
import image from './modules/image';
import bootcamp from './modules/bootcamp';
import user from './modules/user';
import mypage from './modules/mypage';
import status from './modules/status';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  post: post,
  user: user,
  question: question,
  image: image,
  bootcamp: bootcamp,
  mypage: mypage,
  status: status,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
