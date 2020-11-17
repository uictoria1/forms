import React, { Component } from 'react';
import { Bool } from './Form/Bool';
import { Select } from './Form/Select';
import { Text } from './Form/Text';
import { Date } from './Form/Date';
import { Int } from './Form/Int';

export class Form extends Component {
    static displayName = Form.name;

    constructor(props) {
        super(props)
        this.state = {
            questions: this.props.questions,
            answers: {},

            idList: {},
            current: 0,
            currentInput: null,

            size: 0,
            disabled : true
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.Prev = this.Prev.bind(this);
        this.Next = this.Next.bind(this);
    }

    componentDidMount() {
        this.setState({ size: this.props.questions.length });
        let ids = {};

        let count = 0;
        this.props.questions.forEach(function (e) {
            ids[count] = e.id;
            count++;
        });
        this.setState({ idList: ids });
        this.setState({ currentInput: this.renderForm(this.props.questions.filter((e) => e.id === ids[0])[0], "") });
    }

    handleChange(value, id, revert = false) {
        let answers = Object.assign({}, this.state.answers)

        if (revert) {
            delete answers[id];
        }
        else {
            answers[id] = value;
        }

        this.setState({ answers: answers }, function () {
            if (Object.keys(this.state.answers).length === this.state.size) {
                this.setState({ disabled: false });
            }
            else { this.setState({ disabled: true}); }
        })
    }

    Prev() {
        let current = this.state.current - 1;
        let id = this.state.idList[current];
        let answer = this.state.answers[id] == null ? "" : this.state.answers[id];
        if (Object.keys(this.state.idList)[0] < this.state.current) {
            
            this.setState({ current: this.state.current - 1 });
            this.setState({ currentInput: this.renderForm(this.state.questions.filter((e) => e.id === id)[0], answer) });
        }
    }

    Next() {
        let current = this.state.current + 1;
        let id = this.state.idList[current];
        let answer = this.state.answers[id] == null ? "" : this.state.answers[id];
        if (Object.keys(this.state.idList)[Object.keys(this.state.idList).length - 1] > this.state.current) {
            this.setState({ current: ++this.state.current });
            this.setState({ currentInput: this.renderForm(this.state.questions.filter((e) => e.id == id)[0], answer) });
        }
    }

    submit(e) {
        e.preventDefault();
        this.props.sendAnswers(this.state.answers);
    }

    renderForm(question, value) {
        let type = question.questionType.questionTypeName;

        if (type === "text") {
            if (question.enumChoices === null) { // plain text
                return (<Text key={question.id} question={question} change={this.handleChange} value={value }/>);}
            else { // select
                return (<Select key={question.id} question={question} change={this.handleChange} value={value}/>);
            }
        }
        else if (type === "int") {
            return (<Int key={question.id} question={question} change={this.handleChange} value={value}/>);
        }
        else if (type === "date") {
            return (<Date key={question.id} question={question} change={this.handleChange} value={value}/>)
        }
        else { // boolean
            return (<Bool key={question.id} question={question} change={this.handleChange} value={value }/>);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    {this.state.currentInput}
                    <button type="submit" disabled={ this.state.disabled}>Save</button>
                </form>

                <button onClick={this.Prev}>Prev</button>
                <button onClick={this.Next}>Next</button>
            </div>
        );
    }
}

