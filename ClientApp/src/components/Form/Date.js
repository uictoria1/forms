import React, { Component } from 'react';

export class Date extends Component {
    static displayName = Date.name;

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
        };
    }

    render() {
        return (
            <>
                <label>{this.state.question.questionName}</label>
                <div className="input-group mb-3">
                    <input type="date" className="form-control" id={"date_" + this.state.question.id} aria-describedby="basic-addon3" />
                </div>
            </>
        );
    }
}

