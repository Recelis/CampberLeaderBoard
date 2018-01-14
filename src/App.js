import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'
import github from "./img/github.png";

class App extends Component {

  openWindow(){
    window.open("https://github.com/Recelis/CamperLeaderBoard",'_blank');
  }
  render() {
    return (
      <div>
        <Table />
        <p className="Copyright">Created by Jacky Lui using REACTJS
          <span><button onClick = {()=>this.openWindow()}className = "github"><img className = "github" src = {github}></img></button></span>
        </p>
      </div>
    );
  }
}

export default App;
