import React, { Component } from 'react';
import Navbar from './partials/navbar';
import FlashMessagesList from './flash/flashMessagesList'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;