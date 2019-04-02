import React from 'react';
import 'moment/locale/ru.js';
import {DatePickerInput} from 'rc-datepicker';

import Header from './Header.jsx';

import PropTypes from 'prop-types';

class Calculator extends React.Component {
    constructor(props){
        super(props);

        let newDate = new Date();
            newDate.setDate(newDate.getDate()+31);

        this.state={
            amount:0,
            dateFrom: new Date(),
            dateTo:  newDate,
            term: 31,
            editing:false
        };

    }

    componentDidMount() {
        if (this.props.match.params.amount) {
            this.setState({amount: this.props.match.params.amount});
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.editing) {
            let dateFrom = this.state.dateFrom,
                dateTo = this.state.dateTo,
                diff = Math.round(( Date.parse(dateTo) - Date.parse(dateFrom) ) / 86400000);

            this.setState({
                term:diff,
                editing:false});
        }
    }

    render() {
        return ( <div>

            <Header linkTo = "calculator"/>

            <form className="calculator">
                <div className="row calculator-form__controls">
                    <div className="col-3 ml-2">
                        <div className="form-item calculator-form__control">
                            <p className="calculator-label">Сумма банковской гарантии</p>
                            <input
                                type="text"
                                // className="calculator-form__value"
                                value={ this.state.amount }
                                ref="amount"
                                className="form-control services-form__range"
                                onChange={(e) => this.setState({
                                    amount : (e.target.value
                                        .replace(/\s/g, ''))
                                        .replace(',', '.')}
                                    )}
                                onClick={() => this.refs.amount.select()}
                            />
                            {/*<input id="bg-amount"*/}
                                   {/*type="range"*/}
                                   {/*min="0"*/}
                                   {/*max="10000000"*/}
                                   {/*value={this.state.amount}*/}
                                   {/*className="form-control services-form__range"*/}
                                   {/*onChange={this.handleChangeAmount}*/}
                                {/*// style="position: absolute; width: 1px; height: 1px; overflow: hidden; opacity: 0;"*/}
                            {/*/>*/}
                        </div>

                        <div className="form-item calculator-form__control">
                            <p className="calculator-label">Срок</p>
                            <input
                                type="text"
                                // className="calculator-form__value"
                                value={this.state.term}
                                ref="term"
                                className="form-control services-form__range"
                                onChange={(e) => this.setState({term : e.target.value})}
                                onClick={() => this.refs.term.select()}
                            />
                        </div>
                    </div>

                    <div className="calendar col-2 offset-1">
                        <div className="form-item">
                            <p className="calculator-label">Срок БГ с</p>
                            <DatePickerInput
                                onChange={(date) => {
                                    this.setState({
                                        dateFrom: date,
                                        editing:true
                                    });

                                }}
                                value={this.state.dateFrom}
                                className='my-custom-datepicker-component'
                            />
                        </div>

                        <div className="form-item">
                            <p className="calculator-label">Срок БГ по:</p>
                            <DatePickerInput
                                onChange={(date) => {
                                    this.setState({
                                        dateTo: date,
                                        editing:true
                                    });

                                }}
                                value={this.state.dateTo}
                                className='my-custom-datepicker-component'
                            />
                        </div>
                    </div>
                </div>

                <div className="calculator-form__footer col-3 offset-1">
                    <p className="total-label">Сумма комиссии</p>
                    <table className="calc-table table table-striped">
                        <tbody>
                        <tr>
                            <td>3%</td>
                            <td>{(((this.state.amount*this.state.term*0.03/365).toFixed(2))
                                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
                                .replace('.', ',')}
                                &nbsp;руб.
                            </td>
                        </tr>
                        <tr>
                            <td>3,5%</td>
                            <td>{(((this.state.amount*this.state.term*0.035/365).toFixed(2))
                                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
                                .replace('.', ',')}
                                &nbsp;руб.
                            </td>
                        </tr>
                        <tr>
                            <td>4%</td>
                            <td>{(((this.state.amount*this.state.term*0.04/365).toFixed(2))
                                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
                                .replace('.', ',')}
                                &nbsp;руб.
                            </td>
                        </tr>
                        <tr>
                            <td>4,5%</td>
                            <td>{(((this.state.amount*this.state.term*0.045/365).toFixed(2))
                                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
                                .replace('.', ',')}
                                &nbsp;руб.
                            </td>
                        </tr>
                        <tr>
                            <td>5%</td>
                            <td>{(((this.state.amount*this.state.term*0.05/365).toFixed(2))
                                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
                                .replace('.', ',')}
                                &nbsp;руб.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
        )
    }
}

export default Calculator;