import React from 'react';

import DisplayData from './DisplayData.jsx';
import Button from '../Button.jsx'
import Header from '../Header.jsx';


class TenderPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            status: "idle",
            RNT: "",
            tender : []
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchingDataTender = this.fetchingDataTender.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.RNT) {
            this.fetchingDataTender(this.props.match.params.RNT);
            this.setState({RNT:this.props.match.params.RNT});
        }
    }

    fetchingDataTender(RNT){
        this.setState({status: "pending"});
        if (event) event.preventDefault();

        fetch(`/api/scrape/${(RNT)}`).then(function(response) {
            return response.json();
        })
            .then(function(json) {
                this.setState({
                    status:"ready",
                    tender:json
                });
            }.bind(this))
            .catch(() => this.setState({status:"error"}));
        // this.forceUpdate();
    }

    handleChange(event) {
        // event.preventDefault();
        this.setState({ RNT: event.target.value });
        // this.forceUpdate();
    }

    render() {
        return (<React.Fragment>
            <Header linkTo="information"/>

            <form className="row"
                  onSubmit={()=>this.fetchingDataTender(this.state.RNT)}>
                <div className="container">
                    <div className="col mt-2 rounded form-group d-flex justify-content-left">
                        <span><label>Реестровый номер торгов
                                <input
                                    name="title"
                                    className="form-control"
                                    value={this.state.newRNT}
                                    onChange={this.handleChange} />
                            </label>
                            <Button className="search icon btn btn-outline-secondary"
                                    icon="search"
                                    type="submit"/>
                            <Button className="btn btn-outline-info font-weight-bold my-2 mx-4"
                                    type="submit">
                                <a target="_blank"
                                   href={"http://zakupki.gov.ru/epz/order/notice/ea44/view/common-info.html?regNumber="+this.state.RNT}>zakupki.gov</a>
                            </Button>
                        </span>
                    </div>
                </div>
            </form>

            <div className="container">
                    <DisplayData tender={this.state.tender}
                                 status={this.state.status}/>
            </div>
        </React.Fragment>
        )
    }
}

export default TenderPage;