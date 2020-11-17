import React, { Component } from 'react';

export class Select extends Component {
    static displayName = Select.name;

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            value: this.props.value
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        this.setState({ value: e.target.value });
        if (e.target.value !== "Select") {
            this.props.change(e.target.value, this.state.question.id);
        }
        else {
            this.props.change(e.target.value, this.state.question.id, true);
        }
    }

    render() {
        let options = [];
        for (let i = 0; i < this.state.question.enumChoices.length; i++) {
            options = [...options, <option onSelect={this.handleSelect} key={this.state.question.enumChoices[i].id } value={this.state.question.enumChoices[i].enumChoiceName}>{this.state.question.enumChoices[i].enumChoiceName}</option>]
        }
        return (
            <>
                <label>{this.state.question.questionName}</label>
                <div className="input-group mb-3">
                    <select className="custom-select" value={this.state.value} onChange={this.handleSelect}>
                        <option value="Select" onSelect={this.handleSelect}>Не выбрано</option>
                        {options}
                    </select>
                </div>
            </>
        );
    }
}

