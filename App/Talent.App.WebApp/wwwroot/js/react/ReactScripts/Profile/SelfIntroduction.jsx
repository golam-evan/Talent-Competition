/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summary: "",
            description:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveSelfIntroduction = this.saveSelfIntroduction.bind(this);
    
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    saveSelfIntroduction() {
        const data = Object.assign({}, this.state)
        this.props.updateProfileData(data)
    }

    render() {

        return(
            <div className="ui sixteen wide column">
                <div className="field">                   
                    <input
                        type="text"
                        name="summary"
                        value={this.state.summary}
                        placeholder={"Please provide a short summary about yourself"}
                        maxLength="150"
                        onChange={this.handleChange}
                    />
                    <label>Summary must be no more than 150 characters.</label>
                </div>
                <div className="field">
                    <textarea
                        type="textarea"
                        name="description"
                        value={this.state.description}
                        placeholder={"Please tell us about ny hobbies,additional expertise or anythins else you'd like to add."}
                        maxLength="600"
                        onChange={this.handleChange}
                    />
                    <label>Description must be no more than 150-600 characters.</label>
                    <div className="sixteen wide column">
                        <div>
                            <input type="button" className="ui teal button right floated" onClick={this.saveSelfIntroduction} value="Save"></input>
                        </div>
                    </div >
                </div>
            </div>
        )
    }
}



