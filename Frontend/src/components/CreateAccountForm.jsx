import React, { useState } from 'react'
import { JawbreakerInput } from './LoginForm';

export class CreateAccountForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        submitting: false,
        error: false,
        inputs: [
          {
            focused: false,
            value: '',
            error: false
          },
          {
            focused: false,
            value: '',
            error: false
          },
          {
            focused: false,
            value: '',
            error: false
          },
        ]
      };



      this.createAccount = this.createAccount.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
    }

    createAccount(user,pass)
    {

      // need to add checks for if user exists already, and if two passwords match
      let http_string = "http://localhost:8000/api/users/add?userName=" + user +"&password=" + pass 
      console.log(http_string)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch(http_string, requestOptions)
        .then(response => console.log(response))
      // TODO handle if create account worked or not
    }


    handleSubmit(event) {
      let errors = false;
      let newInputs = this.state.inputs.concat();
      for(let i = 0; i < this.state.inputs.length; i++) {
        if (this.state.inputs[i].value.length === 0) {
          errors = true;
          newInputs[i].error = true;
        }
      }

      this.setState({
        error: errors,
        inputs: newInputs
      });
 

      if (!errors) {
        this.setState({submitting: true});
        setTimeout(() => {
          let newInputs = this.state.inputs.concat();
          for(let i = 0; i < this.state.inputs.length; i++) {
            newInputs[i].value = '';
          }
  
          this.setState({
            submitting: false,
            inputs: newInputs
          });
        }, 2000);

        this.createAccount(this.state.inputs[0].value, this.state.inputs[1].value);
      }
      
      event.preventDefault();
    }

    //#region visual stuff

    handleChange(id, value) {
        // immutable array
        let newInputs = this.state.inputs.concat();
        newInputs[id].value = value;
        newInputs[id].error = false;
        this.setState({inputs: newInputs});
      }

    handleFocus(id) {
      // immutable array
      let newInputs = this.state.inputs.concat();
      newInputs[id].focused = true;
      this.setState({inputs: newInputs});
    }
    handleBlur(id) {
      // immutable array
      let newInputs = this.state.inputs.concat();
      newInputs[id].focused = false;
      this.setState({inputs: newInputs});
    }

    //#endregion
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <JawbreakerInput ID="0" Placeholder="Username" Type="text" Focus={this.handleFocus} Blur={this.handleBlur} Change={this.handleChange} Value={this.state.inputs[0].value} Focused={this.state.inputs[0].focused} Error={this.state.inputs[0].error} />
          <JawbreakerInput ID="1" Placeholder="New Password" Type="password" Focus={this.handleFocus} Blur={this.handleBlur} Change={this.handleChange} Value={this.state.inputs[1].value} Focused={this.state.inputs[1].focused} Error={this.state.inputs[1].error} />
          <JawbreakerInput ID="2" Placeholder="Confirm Password" Type="password" Focus={this.handleFocus} Blur={this.handleBlur} Change={this.handleChange} Value={this.state.inputs[2].value} Focused={this.state.inputs[2].focused} Error={this.state.inputs[2].error} />
          <button type="submit" className={(this.state.inputs[1].error || this.state.inputs[0].error || this.state.inputs[2].error) ? 'iconButton error' : 'iconButton'} disabled={this.state.submitting}>
            <span className="label">Create Account</span>
          </button>
        </form>
      )
    }
  }