import React, { Component } from 'react';

export class Result extends Component {
    static displayName = Result.name;

    constructor(props) {
        super(props)
        this.state = {
            status: this.props.statusResult,
            message: this.props.statusMessage,
            answers: this.props.Answers
        }

    }

    render() {
        let answers = Object.keys(this.state.answers).map((q, i) => (
            <li key={i}>
                Q : {q} <br /> A : {this.state.answers[q]}
            </li>
        ));

        if (this.state.status) {
            return (
                <>
                <div>
                        {this.state.message}
                </div>
                <ul>
                    { answers}
                </ul>
                </>
            );
        }
        else {

        }
        return (
            <div>
                { this.state.response }            
            </div>
        );
    }
}

