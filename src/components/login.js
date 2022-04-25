import React, { Component } from 'react'

class login extends Component {
  render() {
    return (
      <>
        <div>
          <h1>Login</h1>
          <br />
          <input placeholder="write email" />
          <br />
          <input placeholder="write password" />
          <br />
          <button>Login</button>
        </div>
      </>
    )
  }
}

export default login
