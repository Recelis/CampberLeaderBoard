import React, { Component } from 'react'

var httpRequest;
var rows = [];

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedState: 'Points in Past 30 Days',
            campersListJSON: {}
        }
        this.alertContents = this.alertContents.bind(this);
    }
    dataPull(link) {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            alert("giving up");
            return false;
        }
        httpRequest.onreadystatechange = this.alertContents;
        httpRequest.open('GET', link);
        httpRequest.send();
    }

    alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                alert(httpRequest.responseText);
                this.setState({
                    campersListJSON: httpRequest.responseText
                })
            } else {
                alert('there was a problem with the request')
            }
        }
    }

    fillRows(){
        for (var ii = 0; ii < 100; ii++){
            rows.push(
            <SingleRow
                number = {ii}
                name = 'name'
                picture = 'picture'
                points30 = 'points30'
                pointsAllTime = 'pointsAllTime'
            />)
        }
        return rows;
    }

    render() {
        return (
            <div className="Table">
                <h1 className="Title">FreeCodeCamp's Leaderboard of Awesomeness</h1>
                <div className="description">
                    <div className="row">
                        <div className="col-xs-3"><h2>#</h2></div>
                        <div className="col-xs-3"><h2>Name</h2></div>
                        <div className="col-xs-3">
                            <Button
                                sortingChosen={() => this.dataPull('https://fcctop100.herokuapp.com/api/fccusers/top/recent')}
                                value="Points in Past 30 Days"
                            />

                        </div>
                        <div className="col-xs-3">
                            <Button
                                sortingChosen={() => this.dataPull('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')}
                                value="Points for All Time" />
                        </div>
                    </div>
                    {this.fillRows()}
                </div>

            </div>
        )
    }
}

function Button(props) {
    return (
        <button onClick={() => props.sortingChosen()}>{props.value}</button>
    );
}

function SingleRow(props) {
    return (
        
        <div className="row">
            <div className="col-xs-3"><p className="Number">{props.number}</p></div>
            <div className="col-xs-3"><p className="Names">{props.name}</p><img src = {props.picture} width='300px' height='300px' alt='nametag'/></div>
            <div className="col-xs-3"><p className="points30">{props.points30}</p></div>
            <div className="col-xs-3"><p className="pointsAllTime">{props.pointsAllTime}</p></div>
        </div>
    );
}

export default Table;