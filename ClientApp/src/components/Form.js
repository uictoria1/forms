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
            idList: {},
            currentId: null,
            maxId: null,
            minId: null,

            currentInput : null

        }

  

        this.Prev = this.Prev.bind(this);
        this.Next = this.Next.bind(this);

    }

    componentDidMount() {
        if (this.props.questions.length > 0) {
            let count = 1;
            let min = count;

            let ids = {}
            this.props.questions.forEach((element) => {
                ids[count] = element.id;
                count++;
            });

            this.setState({ currentId: ids[Object.keys(ids)[0]] });
            this.setState({ idList: ids });

            this.setState({ maxId: --count});
            this.setState({ minId: min });
            //this.setState({ currentInput: this.state.questions.filter((e) => e.id == this.state.currentId) });
            this.setState({ currentInput: Form.renderForm(this.state.questions.filter((e) => e.id == ids[Object.keys(ids)[0]])[0], "")});
        }

    }

   
    static renderForm(question, value) {
        let type = question.questionType.questionTypeName;

        if (type === "text") {
            if (question.enumChoices === null) { // plain text
                return (<Text key={question.id} question={question} value={value}  />);            }
            else { // select
                return (<Select key={question.id} question={question} />);
            }
        }
        else if (type === "int") {
            return (<Int key={question.id} question={question} />);
        }
        else if (type === "date") {
            return (<Date key={question.id} question={question} />)
        }
        else { // boolean
            return (<Bool key={question.id} question={question} />);
        }
    }

    Prev() {
        if (this.state.currentId > this.state.minId) {
            this.setState({ currentId: --this.state.currentId });
        }
        this.setState({ currentInput: this.state.inputs[this.state.idList[this.state.currentId]] });
    }

    Next() {
        if (this.state.currentId < this.state.maxId) {
            this.setState({ currentId: ++this.state.currentId });
        }

        console.log(this.state.idList[this.state.currentId]);

        this.setState({ currentInput: this.state.inputs[this.state.idList[this.state.currentId]] });
    }

    render() {
        return (
            <div>
                <form>
                    {this.state.currentInput}
                    <button>Save</button>
                </form>

                <button onClick={this.Prev}>Prev</button>
                <button onClick={this.Next}>Next</button>
            </div>
        );
    }
}

