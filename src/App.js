import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.!!!!!!!!!????
                </p>
            </div>
        );
    }
}

class Square extends Component {
    handleClick() {
        this.props.handleClick();
    }

    render() {
        return (
            <button className="square" onClick={() => this.handleClick()}>
                {this.props.curStatus}
            </button>
        );
    }
}

class Move extends Component {
    render() {
        return (
            <button onClick={() => this.props.jumpTo()}>
                {this.props.buttonName}
            </button>
        );
    }
}

class Board extends Component {
    handleClick(i) {
        this.props.handleClick(i);
    }

    renderSquare(i) {
        return (
            <Square
                handleClick={() => this.handleClick(i)}
                curStatus={
                    this.props.state.history[this.props.state.history.length - 1].status[
                        i
                        ]
                }
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{status: Array(9).fill("")}],
            flag: true
        };
    }

    handleClick(i) {
        let history = this.state.history.slice();
        let status = this.state.history[history.length - 1].status.slice();
        if ("" === status[i] && !calWin(status)) {
            if (this.state.flag) {
                status[i] = "O";
            } else {
                status[i] = "X";
            }
            this.setState({
                history: history.concat([{status: status}]),
                flag: !this.state.flag
            });
        }
    }

    reset() {
        this.setState({
            history: [{status: Array(9).fill("")}],
            flag: true
        });
    }

    jumpTo(i) {
        let history = this.state.history.slice().splice(0, i + 1);
        this.setState({
            history: history,
            flag: history.length % 2 !== 0
        });
    }

    render() {
        let player = this.state.flag ? "O" : "X";
        let winner = this.state.flag ? "X" : "O";
        let text;
        if (calWin(this.state.history[this.state.history.length - 1].status)) {
            text = `Winner: ${winner}`;
        } else {
            text = `Next player: ${player}`;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board handleClick={i => this.handleClick(i)} state={this.state}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                    <div className="status">{text}</div>
                    {this.state.history.map((status, i) => (
                        <Move buttonName={`Step ${i}`} jumpTo={() => this.jumpTo(i)}/>
                    ))}
                </div>
            </div>
        );
    }
}

// ========================================

// ReactDOM.render(<Game/>, document.getElementById("root"));

function calWin(status) {
    if (
        equals(0, 1, 2, status) ||
        equals(3, 4, 5, status) ||
        equals(6, 7, 8, status) ||
        equals(0, 3, 6, status) ||
        equals(1, 4, 7, status) ||
        equals(2, 5, 8, status) ||
        equals(0, 4, 8, status) ||
        equals(2, 4, 6, status)
    ) {
        return true;
    } else {
        return false;
    }
}

function equals(i1, i2, i3, status) {
    if (
        status[i1] !== "" &&
        status[i1] === status[i2] &&
        status[i1] === status[i3]
    ) {
        return true;
    } else {
        return false;
    }
}

export {App, Game};
