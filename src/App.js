import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'

class App extends Component {
  render() {
    return (
      <div>
        <Table />
        <p className="Copyright">Created by Jacky Lui using REACTJS</p>
      </div>
    );
  }
}

export default App;
