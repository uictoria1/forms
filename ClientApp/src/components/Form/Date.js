import React, { Component } from 'react';

export class Date extends Component {
    static displayName = Date.name;

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value})
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
                    <input value={this.state.value} type="date" className="form-control" onChange={this.handleChange} aria-describedby="basic-addon3" />
                </div>
            </>
        );
    }
}

