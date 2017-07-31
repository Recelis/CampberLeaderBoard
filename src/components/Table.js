import React, { Component } from 'react'


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedState: '30days',
            campersListJSON: Array(100).fill('1'),
            currentLink: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
        }
        this.dataPull = this.dataPull.bind(this);
    }
    dataPull() {
        var httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            alert("giving up");
            return false;
        }
        httpRequest.onreadystatechange = () => this.alertContents(httpRequest);
        httpRequest.open('GET', this.state.currentLink);
        httpRequest.send();
        return true;
    }

    changeLink(link,buttonState) {
        this.setState({
            currentLink: link,
            sortedState:buttonState
        })
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
        return;
    }

    render() {
        return (
            <div className="Table">
                {this.dataPull()}
                <h1 className="Title">FreeCodeCamp's Leaderboard of Awesome</h1>
                <div className="description">
                    <div className="row">
                        <div className="col-xs-3"><h2>#</h2></div>
                        <div className="col-xs-3"><h2>Name</h2></div>
                        <div className="col-xs-3">
                            <Button
                                sortingChosen={() => this.changeLink('https://fcctop100.herokuapp.com/api/fccusers/top/recent','30days')} // update state not pull data 
                                value="Points in Past 30 Days"
                                sortedState={this.state.sortedState}
                                buttonState = "30days"
                            />

                        </div>
                        <div className="col-xs-3">
                            <Button
                                sortingChosen={() => this.changeLink('https://fcctop100.herokuapp.com/api/fccusers/top/alltime','allTime')} // update state not pull data 
                                value="Points for All Time" 
                                sortedState={this.state.sortedState} 
                                buttonState = 'allTime'   
                            />
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
    var rowColor = 'colorRow';
    for (var ii = 0; ii < 100; ii++) {
        if (ii%2===0) rowColor = 'colorRow';
        else rowColor = 'noColorRow';
        rows.push(
            <SingleRow
                key={ii.toString()}
                rowColor={rowColor}
                number={ii + 1}
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
        <div className={props.rowColor}>
            <div className="row">
                <div className="col-xs-3"><p className="Number">{props.number}</p></div>
                <div className="col-xs-3"><p className="Names"><span><img className="images" src={props.picture} width='50px' height='50px' alt='nametag' /></span>{props.name}</p></div>
                <div className="col-xs-3"><p className="points30">{props.points30}</p></div>
                <div className="col-xs-3"><p className="pointsAllTime">{props.pointsAllTime}</p></div>
            </div>
        </div>
    );
}

function Button(props) {
    var colorText = 'emphasized';
    if (props.sortedState === props.buttonState) colorText = 'emphasized';
    else colorText = 'notEmphasized'; 
    return (
        <button className={"buttons " + colorText} onClick={() => props.sortingChosen()}><u>{props.value}</u></button>
    );
}

export default Table;