import React, { Component } from 'react';

export class Bool extends Component {
    static displayName = Bool.name;

    constructor(props) {
        super(props);
        let value = "";
        if (this.props.value === "true") {
            value = "yes";
        }
        else if (this.props.value === "false") {
            value = "no";
        }
        this.state = {
            question: this.props.question,
            selected: value
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({selected: e.target.value === "true" ? "yes" : "no"})
        this.props.change(e.target.value, this.state.question.id)
    }

    render() {
        return (
            <>
                <label>{this.state.question.questionName}</label>
                <div className="input-group mb-3">
                    <label>Yes &nbsp;</label>
                    <span class="align-bottom">
                        <input checked={ this.state.selected === "yes"} onChange={this.handleChange} name="yes_no" type="radio" value={true}/>
                    </span>
                     &nbsp; &nbsp; &nbsp;
                    <label>No &nbsp;</label>
                    <span class="align-bottom">
                        <input checked={this.state.selected === "no"} onChange={this.handleChange} name="yes_no" type="radio" value={false} />
                    </span>
                    
                </div>
            </>
        );
    }
}

