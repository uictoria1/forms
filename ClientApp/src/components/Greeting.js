import React from 'react';

export class Greeting extends React.Component {

    render() {
        return (
            <div className="mt-5">
                <h1 className="text-center">Предлагаем вам заполнить анкету</h1>
                <div className="text-center">
                    <button type="button" onClick={() => this.props.onClick()} className="btn btn-success mt-3 text-center mb-3">Начать</button>
                </div>
            </div>
        );
    }
}