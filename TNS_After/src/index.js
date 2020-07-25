import React,{Suspense,lazy} from 'react';
import ReactDom from 'react-dom';
import {HashRouter,BrowserRouter} from 'react-router-dom';
import App from './app';
// const App = lazy(() => import('./app'));

const Router = (process.env.NODE_ENV === 'development') ? HashRouter : BrowserRouter;

ReactDom.render(
    <Router>
        {/* <Suspense fallback={<div>loading...</div>}> */}
            <App/>
        {/* </Suspense> */}
    </Router>,
    document.getElementById('app')
);