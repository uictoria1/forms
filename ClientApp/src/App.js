import React, { Component } from 'react';
import { Form } from './components/Form';
import { Greeting } from './components/Greeting';
import { Result } from './components/Results';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            apiUrl : "/api/question",
            questions: [],
            start : false,
            result: false,
            status: true,
            statusMessage : "",
            resultAnswers: null
        }

        this.hideGreeting = this.hideGreeting.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    sendData(answers) {
        let data = new FormData();
        let count = 0;
        for (const [key, value] of Object.entries(answers)) {
            data.append("[" + count + "].key", key);
            data.append("[" + count + "].value", value);
            count++;
        }

        var xhr = new XMLHttpRequest();

        xhr.open("post", this.state.apiUrl, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                this.setState({
                    start: false,
                    result: true,
                    status: true,
                    statusMessage: "Thank you! Your answers saved",
                    resultAnswers: JSON.parse(xhr.response)
                });
            }
            else {
                this.setState({
                    start: false,
                    result: true,
                    status: false,
                    statusMessage: "Sorry. There was an error on the other end"
                });
            }
        }.bind(this);
        xhr.send(data);
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.state.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ questions: data });
        }.bind(this);
        xhr.send();
    }

    hideGreeting() {
        this.setState({start : true})
    }

    render() {
        return (
            <div className="container">
                {!this.state.start && !this.state.result && <Greeting onClick={ this.hideGreeting} /> }
                {this.state.start && !this.state.result && <Form questions={this.state.questions} sendAnswers={this.sendData} />}
                {!this.state.start && this.state.result && <Result statusMessage={this.state.statusMessage} statusResult={this.state.status} Answers={this.state.resultAnswers} />}
            </div>
        );
    }
}

