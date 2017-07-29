import React, {Component} from 'react'

class Table extends Component{
    constructor(props){
        super(props);
        this.state={
            campersListJSON:{}
        }
    }
    render(){
        return(
            <div className="Table">
                <h1 className="Title">FreeCodeCamp's Leaderboard of Awesomeness</h1>
                <div className="description">
                    <div className="row">
                        <div className="col-xs-3"><h2>#</h2></div>
                        <div className="col-xs-3"><h2>Name</h2></div>
                        <div className="col-xs-3"><h2>Points in Past 30 Days</h2></div> // change to functional component
                        <div className ="col-xs-3"><h2> Points for All Time</h2></div> // change to functional component
                    </div>
                    <div className="row">
                        <div className="col-xs-3"><p className="Number"></p></div>
                        <div className="col-xs-3"><p className="Names"></p></div>
                        <div className="col-xs-3"><p className="points30"></p></div>
                        <div className="col-xs-3"><p className="pointsAllTime"></p></div>
                    </div>        
                </div>

            </div>
        )
    }
}

export default Table;