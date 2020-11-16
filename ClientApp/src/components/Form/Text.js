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
    }

    render() {
        return (
            <>
                <label>{this.state.question.questionName}</label>
                <div className="input-group mb-3">
                    <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" id={"text_" + this.state.question.id} aria-describedby="basic-addon3" />
                </div>
            </>
        );
    }
}

