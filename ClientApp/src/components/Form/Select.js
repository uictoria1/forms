import React, { Component } from 'react';

export class Select extends Component {
    static displayName = Select.name;

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            select_changed: false

        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {

    }

    render() {
        let options = [];
        for (let i = 0; i < this.state.question.enumChoices.length; i++) {
            options = [...options, <option onSelect={this.handleSelect} value={this.state.question.enumChoices[i].enumChoiceName}>{this.state.question.enumChoices[i].enumChoiceName}</option>]
        }
        return (
            <>
                <label>{this.state.question.questionName}</label>
                <div className="input-group mb-3">
                    <select className="custom-select" id={"select_" + this.state.question.id} >
                        <option value="defaultValue" onSelect={this.handleSelect}>Open this select menu</option>
                        {options}
                    </select>
                </div>
            </>
        );
    }
}

