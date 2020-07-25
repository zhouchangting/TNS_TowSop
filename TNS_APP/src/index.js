import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter,BrowserRouter} from 'react-router-dom'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import store from "./redux/store";
import { Provider  } from 'react-redux'
import 'moment/locale/zh-cn';
// import 'antd/dist/antd.css';
moment.locale('zh-cn');
const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter
// const Router =  BrowserRouter

ReactDOM.render(
  <Router>
  {/*<React.StrictMode>*/}
    <Provider store={store}>
    <App />
    </Provider>
  {/*</React.StrictMode>*/}
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
