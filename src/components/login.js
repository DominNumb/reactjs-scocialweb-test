import React, { Component, version } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useremail: '',
      userpassword: '',
    }
  }
  render() {
    return (
      <>
        <div>
          <h1>Login to SocialWeb</h1> <h3>v{this.props.version}</h3>
          <br />
          <input
            value={this.state.useremail}
            onChange={(event) =>
              this.setState({ useremail: event.target.value })
            }
            placeholder="write email"
          />
          <br />
          <input
            value={this.state.userpassword}
            onChange={(event) =>
              this.setState({ userpassword: event.target.value })
            }
            placeholder="write password"
          />
          <br />
          <button onClick={() => console.log(this.state.useremail)}>
            Login
          </button>
        </div>
        <div>
          <br />
          <br />
          <br />
          <br />
          <button>get inf</button>
        </div>
      </>
    )
  }
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
    version: state.appVersion.version,
  }
}

export default connect(mapStateToProps)(Login)
