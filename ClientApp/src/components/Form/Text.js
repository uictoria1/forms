import React, { Component } from 'react';

export class Text extends Component {
    static displayName = Text.name;

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        if (e.target.value === "") {
            this.props.change(e.target.value, this.state.question.id, true);
        }
        else {
            this.props.change(e.target.value, this.state.question.id);
        }
    }

    render() {
        return (
            <>
                <label>{this.state.question.questionName}</label>
                <div className="input-group mb-3">
                    <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" aria-describedby="basic-addon3" />
                </div>
            </>
        );
    }
}

