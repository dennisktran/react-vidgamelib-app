import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlSubmit = async (e) => {

    e.preventDefault();
    const data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    data.append('email', this.state.email);

    console.log(data.entries(), ' this is data')
    for (let pair of data.entries()){
      console.log(pair[0]  ,', ', pair[1])
    }

    const registerCall = this.props.register(data);
    registerCall.then((response) => {
      console.log(response)
        if(response.status.message === "Success"){
          this.props.history.push('/profile')
        } else {
          console.log(response, ' this should have an error message? How could you display that on the screen')
        }
    })
  }

  render(){

    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Register
          </Header>
          <Form onSubmit={this.handlSubmit}>
              <Segment stacked>
              Username:
              <Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' onChange={this.handleChange}/>
              Email:
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='email' type='text' name='email' onChange={this.handleChange}/>
              password:
              <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
              <Button fluid size='large' type='sumbit'>Register</Button>
              <Message>
                Already a member? <Link to='/Login'>Login</Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      )
  }
}

export default Register;
