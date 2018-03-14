import React from 'react'
import Navbar from './navbar'
import ProjectsListResearcher from './projectsListResearcher'
import Main from './main'
import Footer from './footer';
import { Switch, Route } from 'react-router-dom'
import server from './serverConfig'
import axios from 'axios'
class App extends React.Component {



	constructor(props) {
        super(props);
        this.state = ({userData: undefined});


	}
    componentDidMount() {
        if (localStorage.getItem('userData') == undefined) {

            //this.state = { userData: undefined };
            axios.post(server.serverApi + '/userdata', { token: window.location.href.split('=')[1] }).then((response) => {
                // this.setState({ userData: response.data });
                if (response.data != undefined) {
                    
                    localStorage.setItem('userData', JSON.stringify(response.data));
                    this.res = response;
                    let self = this;
                    axios.post(server.serverApi + '/api/checkUser', { user: JSON.parse(localStorage.getItem('userData')) }).then((response) => {

                        localStorage.setItem('signUp', response.data);
                         this.setState({ userData: self.res.data });

                    });
                   
                }

            });

        } else {
            if (this.state.userData == undefined) {
                
                axios.post(server.serverApi + '/api/checkUser', { user: JSON.parse(localStorage.getItem('userData')) }).then((response) => {

                    localStorage.setItem('signUp', response.data);
                    var ob = JSON.parse(localStorage.getItem('userData'));
                    this.setState({ userData: ob });

                });
            }
            
          
        }
    }
    render() {
        return (
			<div class="container-webpage">
                <Navbar userData={this.state.userData}/>
                <Main userData={this.state.userData}/>
                <Footer userData={this.state.userData}/>
			</div>
		);
	}
}


export default App;
