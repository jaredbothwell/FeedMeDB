import React from "react";
import "./css_files/LoginForm.css";

export class JawbreakerInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  handleChange(event) {
    this.props.Change(this.props.ID, event.target.value);
  }
  handleFocus(event) {
    this.props.Focus(this.props.ID);
  }
  handleBlur(event) {
    this.props.Blur(this.props.ID);
  }
  render() {
    return (
      <span
        className={
          this.props.Value.length > 0 || this.props.Focused
            ? "input filled"
            : "input"
        }
      >
        <input
          value={this.props.Value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          className="field"
          type={this.props.Type}
        />
        <label className={this.props.Error ? "label error" : "label"}>
          <span className="content">{this.props.Placeholder}</span>
        </label>
        <span
          className={this.props.Error ? "errorMessage visible" : "errorMessage"}
        >
          This field cannot be empty.
        </span>
      </span>
    );
  }
}

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      error: false,
      inputs: [
        {
          focused: false,
          value: "",
          error: false,
        },
        {
          focused: false,
          value: "",
          error: false,
        },
      ],
    };

    this.verifyCreds = this.verifyCreds.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  verifyCreds(user, pass) {
    // need to add checks for if user exists already, and if two passwords match
    let http_string =
      "http://localhost:8000/api/users/login?userName=" +
      user +
      "&password=" +
      pass;
    console.log(http_string);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };

    fetch(http_string, requestOptions).then((response) =>
      response.json().then((u) => {
        if (u != null) {
          this.props.updateStatus([u, true]);
        } else {
          this.props.updateStatus([null, false]);
        }
      })
    );

    // add some fail code here
  }

  handleChange(id, value) {
    // immutable array
    let newInputs = this.state.inputs.concat();
    newInputs[id].value = value;
    newInputs[id].error = false;
    this.setState({ inputs: newInputs });
  }
  handleSubmit(event) {
    let errors = false;
    let newInputs = this.state.inputs.concat();
    for (let i = 0; i < this.state.inputs.length; i++) {
      if (this.state.inputs[i].value.length === 0) {
        errors = true;
        newInputs[i].error = true;
      }
    }

    this.setState({
      error: errors,
      inputs: newInputs,
    });

    if (!errors) {
      this.setState({ submitting: true });
      setTimeout(() => {
        let newInputs = this.state.inputs.concat();
        for (let i = 0; i < this.state.inputs.length; i++) {
          newInputs[i].value = "";
        }

        this.setState({
          submitting: false,
          inputs: newInputs,
        });
      }, 2000);
    }

    event.preventDefault();
    this.verifyCreds(this.state.inputs[0].value, this.state.inputs[1].value);
  }
  handleFocus(id) {
    // immutable array
    let newInputs = this.state.inputs.concat();
    newInputs[id].focused = true;
    this.setState({ inputs: newInputs });
  }
  handleBlur(id) {
    // immutable array
    let newInputs = this.state.inputs.concat();
    newInputs[id].focused = false;
    this.setState({ inputs: newInputs });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <JawbreakerInput
          ID="0"
          Placeholder="Username"
          Type="text"
          Focus={this.handleFocus}
          Blur={this.handleBlur}
          Change={this.handleChange}
          Value={this.state.inputs[0].value}
          Focused={this.state.inputs[0].focused}
          Error={this.state.inputs[0].error}
        />
        <JawbreakerInput
          ID="1"
          Placeholder="Password"
          Type="password"
          Focus={this.handleFocus}
          Blur={this.handleBlur}
          Change={this.handleChange}
          Value={this.state.inputs[1].value}
          Focused={this.state.inputs[1].focused}
          Error={this.state.inputs[1].error}
        />
        <button
          type="submit"
          className={
            this.state.inputs[1].error || this.state.inputs[0].error
              ? "iconButton error"
              : "iconButton"
          }
          disabled={this.state.submitting}
        >
          <span className="label">Login</span>
        </button>
      </form>
    );
  }
}
