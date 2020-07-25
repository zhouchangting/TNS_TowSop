import React from 'react';
import Login from '@/modules/login';

export function withLogin(InnerComponent){
    return class extends React.Component{
        constructor(){
            super();

            if(!this.state){
                this.state = {}
            }
            this.state.userInfo = {};
            this.state.login = false
        }

        componentWillMount(){
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if(userInfo){
                this.setState({
                    login: true,
                    userInfo: userInfo
                })
            }else{
                this.props.history.push({
                    pathname: '/login'
                })
            }

        }

        render(){
            return <InnerComponent {...this.state.userInfo} {...this.props} />
        }
    }
}

export function withLogin2(InnerComponent){
    return class OuterComponent extends InnerComponent{
        constructor(){
            super();

            if(!this.state){
                this.state = {}
            }
            this.state.login = false;
        }
        
        componentDidMount(){
            //获取Token
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if(userInfo){
                this.setState({
                    login: true
                })
            }

            if(super.componentDidMount){
                super.componentDidMount();
            }
        }

        render(){
            const login = this.state.login;
            // console.log(login,this.props);
            if(login){
                console.log('hoc return',this.props);
                return super.render();
            }
            
            return <Login {...this.props}/>
        }
    }
}