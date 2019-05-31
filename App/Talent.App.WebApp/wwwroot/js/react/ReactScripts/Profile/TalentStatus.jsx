import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobSeekingStatus:{
                status: ""
            },
            status: ""
        }

        this.handleChange = this.handleChange.bind(this)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState !== nextProps)
            return { status: nextProps.status };
        return null
    }
    handleChange(event) {
        let jobSeekingStatus = {
            status: event.target.value
        }
        this.setState({ jobSeekingStatus },
            () => this.props.saveProfileData(this.state.jobSeekingStatus))
    }
    render() {
        let status
        if (this.state.status) {
             status = this.state.status.status
        }
        return (
            <div className="ui form">
               <div className="field">
                    <label>Current Status</label>
                </div>
                <div className="field">
                    <div className="ui radio checkbox">
                        <input
                            type="radio"
                            name="Job"
                            value="Actively looking for a job"
                            onClick={this.handleChange}
                            defaultChecked={status === "Actively looking for a job" ?  "checked" : null}                        >
                        </input>
                        <label>Actively looking for a job</label>
                    </div>
                </div>
                <div className="field">
                <div className="ui radio checkbox">
                    <input
                            type="radio"
                            name="Job"
                            value="Not looking for a job at the moment"
                            onClick={this.handleChange}
                            defaultChecked={status === "Not looking for a job at the moment" ? "checked" : null}
                    >
                        </input>
                        <label>Not looking for a job at the moment</label>
                    </div>
                </div>
                <div className="field">
                <div className="ui radio checkbox">
                    
                    <input
                        type="radio"
                        name="Job"
                        value="Currently employed but open for offers"
                        onClick={this.handleChange}
                        defaultChecked={status === "Currently employed but open for offers" ? "checked" : null}
                    >
                        </input>
                        <label>Currently employed but open for offers</label>
                    </div>
                </div>
                <div className="ui radio checkbox">
                    <input
                        type="radio"
                        name="Job"
                        value="Will be available on later date"
                        onClick={this.handleChange}
                        defaultChecked={status === "Will be available on later date" ? "checked" : null}
                    >
                    </input>
                    <label>Will be available on later date</label>
                </div>
            </div>
            )
    }
}