import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {DatePickerInput} from 'rc-datepicker';

import Button from '../Button.jsx';
import Header from '../Header.jsx';
import DisplayWinners from "./DisplayWinners.jsx";

class TenderWinners extends Component {
    constructor(props){
        super(props);

        this.state={
            status: "idle",
            dateFrom: new Date(),
            dateTo: new Date(),
            clients:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({status:"pending"});

        event.preventDefault();

        let dateFrom = this.state.dateFrom.getDate()+'.'+(this.state.dateFrom.getMonth()+1)+'.'+this.state.dateFrom.getFullYear();
        let dateTo = this.state.dateTo.getDate()+'.'+(this.state.dateTo.getMonth()+1)+'.'+this.state.dateTo.getFullYear();

        fetch(`/api/winners?dateFrom=${dateFrom}&dateTo=${dateTo}`).then(function(response) {
            return response.json();
        })
            .then(function(json) {
                this.setState({status:"ready"});
                this.setState({clients:json});
            }.bind(this))
            .catch(() => this.setState({status:"error"}));
    };

    render(){
        const {status, clients} = this.state;

        return <div>
            <Header linkTo= "search"/>
            <div className="container">
                <form className="m-1" onSubmit={this.handleSubmit}>
                    <p>Выберите интервал дат</p>
                    <div className="row">
                        <div className="col-2 px-1 mr-1">
                            <DatePickerInput
                                type="text"
                                onChange={(date) => this.setState({dateFrom: date})}
                                value={this.state.dateFrom}
                                className='my-custom-datepicker-component'
                            />
                        </div>

                        <div className="col-2 px-1 mr-1">
                            <DatePickerInput
                                type="text"
                                onChange={(date) => this.setState({dateTo: date})}
                                value={this.state.dateTo}
                                className='my-custom-datepicker-component'
                            />
                        </div>
                        <Button className="btn btn-info font-weight-bold" type="submit">Поиск победителей</Button>
                    </div>
                </form>

                <DisplayWinners status={status} clients={clients}/>

            </div>

        </div>
    }
}

export default TenderWinners;