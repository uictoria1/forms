import React, { Component } from 'react';
import { Form } from './components/Form';
import { Greeting } from './components/Greeting';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            apiUrl : "/api/question",
            questions: [],
            start : false,
            result : false
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
                // 
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
            <div>
                {!this.state.start && <Greeting onClick={ this.hideGreeting} /> }
                {this.state.start && <Form questions={this.state.questions} sendAnswers={ this.sendData}/> }
                {this.state.start && <Result questions={this.state.questions} sendAnswers={ this.sendData}/> }
            </div>
        );
    }
}
