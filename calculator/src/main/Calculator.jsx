import React, { Component, Fragment } from 'react'
import './calculator.css'
import Display from '../components/display/Display'
import Button from '../components/button/Button'

class Calculator extends Component {
    constructor(props){
        super(props)

        this.flush = this.flush.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    initialState = {
        displayValue: '0',
        clearDisplay: false,
        operation: null,
        values: [0, 0],
        current: 0
    }

    state = { ...this.initialState }

    flush(e){
        this.setState({ ...this.initialState })
    }

    addDigit(e){
        const digit = e.target.textContent
        if(digit === '.' && this.state.displayValue.includes('.'))
            return
        
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({ displayValue, clearDisplay: false })

        if(digit != '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }

        console.log(this.state.values)
    }

    setOperation(e){
        const op = e.target.textContent
        const current = this.state.current
        if(current === 0){
            this.setState({ operation: op, current: 1, clearDisplay: true })
        }else{
            const equals = op === '='
            const currentOp = this.state.operation

            const values = [...this.state.values]
            switch(currentOp){
                case '+':
                    values[0] = values[0] + values[1]
                    break
                case '-':
                    values[0] = values[0] - values[1]
                    break
                case '*':
                    values[0] = values[0] * values[1]
                    break
                case '/':
                    values[0] = values[0] / values[1]
                    break
            }

            this.setState({ 
                displayValue: `${values[0]}`,
                operation: equals ? null : op,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
             })
        }
        console.log(this.state)
    }

    render(){
        return (
            <>
                <h1 className="title">Calculadora</h1>
                <div className="calculator">
                    <Display value={this.state.displayValue}></Display>
                    <Button label='AC' triple click={this.flush}/>
                    <Button label='/' operation click={this.setOperation}/>
                    <Button label='7' click={this.addDigit}/>
                    <Button label='8' click={this.addDigit}/>
                    <Button label='9' click={this.addDigit}/>
                    <Button label='*' operation click={this.setOperation}/>
                    <Button label='4' click={this.addDigit}/>
                    <Button label='5' click={this.addDigit}/>
                    <Button label='6' click={this.addDigit}/>
                    <Button label='-' operation click={this.setOperation}/>
                    <Button label='1' click={this.addDigit}/>
                    <Button label='2' click={this.addDigit}/>
                    <Button label='3' click={this.addDigit}/>
                    <Button label='+' operation click={this.setOperation}/>
                    <Button label='0' double click={this.addDigit}/>
                    <Button label='.' click={this.addDigit}/>
                    <Button label='=' operation click={this.setOperation}/>
                </div>
            </>
        )
    }
}

export default Calculator