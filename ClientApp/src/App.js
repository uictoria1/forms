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
            start : false
        }

        this.hideGreeting = this.hideGreeting.bind(this);
    }

    componentDidMount() {
        this.loadData();
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
                {this.state.start && <Form questions={this.state.questions}/> }
            </div>
        );
    }
}
