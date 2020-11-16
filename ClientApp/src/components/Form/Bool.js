import React, { Component } from 'react';

export class Bool extends Component {
    static displayName = Bool.name;

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            value: null
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({ value: !this.state.value })
    }

    render() {
        return (
            <>
                <label>{this.state.question.questionName}</label>
                <div className="input-group mb-3">
                    <input onChange={this.handleChange} type="radio" id={"radioYes_" + this.state.question.id} value={true} checked={this.state.value} />
                    <label for={"radioYes_" + this.state.question.id}>Yes</label>

                    <input onChange={this.handleChange} type="radio" id={"radioNo_" + this.state.question.id} value={false} checked={!this.state.value} />
                    <label for={"radioNo_" + this.state.question.id}>No</label>
                </div>
            </>
        );
    }
}

