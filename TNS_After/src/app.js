import React,{lazy} from 'react';
import {Switch,withRouter,Route,Redirect} from 'react-router-dom';
// import {withLogin} from '@/utils/Hoc';

// //二级组件引入
// import Login from './modules/login';
import Home from './modules/home';
import Login from './modules/login';
// const Home = lazy(()=>import('./modules/home'));
// const Login = lazy(()=>import('./modules/login'));

class App extends React.Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Redirect from="/" to="/home" exact/>
                </Switch>   
                {/* <Home /> */}
            </div>
        );
    }
}

// App = withLogin(App);
App = withRouter(App);
export default App;