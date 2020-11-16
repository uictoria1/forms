import React, { Component } from 'react';

export class Int extends Component {
    static displayName = Int.name;

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
                    <input type="number" className="form-control" id={"int_" + this.state.question.id} aria-describedby="basic-addon3" />
                </div>
            </>
        );
    }
}

