import React from 'react';

import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';

import io from "socket.io-client"
import connect from "./api"

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            equation: '',
            newResult: '',
            results: []
        };
        this.socket = io('http://localhost:3000')
        this.setNewMessage = this.setNewMessage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        connect(message => {
            console.log(message);
        })
    }

    componentDidMount() {
        this.socket.on('message', message => {
            message.key = JSON.stringify(message)
            this.setState((prevState) => {
                let results = prevState.results
                results.unshift(message)
                if (results.length > 10)
                    results.pop()
            })
        })
    }

    componentWillUnmount() {
        this.socket.close()
    }

    setNewMessage(event) {
        this.setState({
            newResult: event.target.value
        })
    }

    handleSubmit() {
        this.socket.emit('message', this.state.newResult)
        this.setState({
            newResult: ''
        })
    }

    onButtonPress = event => {
        let equation = this.state.equation;
        const pressedButton = event.target.innerHTML;
        let clearEquation = false;

        if (pressedButton === 'C')
            return this.clear();
        else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.')
            equation += pressedButton;
        else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1)
            equation += ' ' + pressedButton + ' ';
        else if (pressedButton === '=') {
            try {
                const evalResult = eval(equation);
                const result = Number.isInteger(evalResult) ? evalResult : evalResult.toFixed(2);
                clearEquation = true;
                this.setState({ newResult: equation + " = " + result });
            } catch (error) {
                alert('Invalid Mathematical Equation');
            }
        } else {
            equation = equation.trim();
            equation = equation.substr(0, equation.length - 1);
        }

        if (!clearEquation) {
            this.setState({ equation: equation });
        } else {
            this.handleSubmit();
            this.setState({ equation: '' });
        }
    }

    clear() {
        this.setState({ equation: '', newResult: '' });
    }

    render() {
        return (
            <main className="calculator">
                <Screen equation={this.state.equation} result={this.state.newResult} />
                {/* <Screen equation={this.state.equation} results={this.state.results} /> */}
                <Keypad onButtonPress={this.onButtonPress} />
            </main>
        );
    }
}

export default Calculator;