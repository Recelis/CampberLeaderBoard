import React, { Component } from 'react'


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedState: '30days',
            campersListJSON: Array(100).fill('1')
        }
        this.dataPull = this.dataPull.bind(this);
    }
    dataPull(link, newState) {
        var httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            alert("giving up");
            return false;
        }
        httpRequest.onreadystatechange = ()=>this.alertContents(httpRequest);
        httpRequest.open('GET', link);
        httpRequest.send();
        return httpRequest.status;
    }

    alertContents(httpRequest) {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // console.log(httpRequest.responseText);
                this.setState({
                    campersListJSON: JSON.parse(httpRequest.responseText)
                })
            } else {
                alert('there was a problem with the request')
            }
        }
    }

    render() {
        return (
            <div className="Table">
                {this.dataPull('https://fcctop100.herokuapp.com/api/fccusers/top/recent', '30days')}
                <h1 className="Title">FreeCodeCamp's Leaderboard of Awesomeness</h1>
                <div className="description">
                    <div className="row">
                        <div className="col-xs-3"><h2>#</h2></div>
                        <div className="col-xs-3"><h2>Name</h2></div>
                        <div className="col-xs-3">
                            <Button
                                sortingChosen={()=>{console.log('happy')}} // update state not pull data (httpRequest) => this.dataPull('https://fcctop100.herokuapp.com/api/fccusers/top/recent', '30days')
                                value="Points in Past 30 Days"
                            />

                        </div>
                        <div className="col-xs-3">
                            <Button
                                sortingChosen={()=>{console.log('sad')}} // update state not pull data (httpRequest) => this.dataPull('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', 'allTime')
                                value="Points for All Time" />
                        </div>
                    </div>
                     <Rows
                        campersListJSON={this.state.campersListJSON}
                    /> 
                </div>

            </div>
        )
    }
}

function Rows(props) {
    var rows = [];
    for (var ii = 0; ii < 100; ii++) {
        rows.push(
            <SingleRow
                key={ii.toString()}
                number={ii+1}
                name={props.campersListJSON[ii].username}
                picture={props.campersListJSON[ii].img}
                points30={props.campersListJSON[ii].recent}
                pointsAllTime={props.campersListJSON[ii].alltime}
            />)
    }
    // console.log(rows)
    return (
        <div>{rows}</div>
    );
}

function SingleRow(props) {
    return (
        <div className="row">
            <div className="col-xs-3"><p className="Number">{props.number}</p></div>
            <div className="col-xs-3"><p className="Names">{props.name}</p><img src={props.picture} width='300px' height='300px' alt='nametag' /></div>
            <div className="col-xs-3"><p className="points30">{props.points30}</p></div>
            <div className="col-xs-3"><p className="pointsAllTime">{props.pointsAllTime}</p></div>
        </div>
    );
}

function Button(props) {
    return (
        <button onClick={() => props.sortingChosen()}>{props.value}</button>
    );
}

export default Table;