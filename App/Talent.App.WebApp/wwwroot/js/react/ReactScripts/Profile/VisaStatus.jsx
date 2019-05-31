import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newValues: {
                visaStatus: "",
                visaExpiryDate: ""
            },
            showVisaExpiry: false,
            visaStatus: this.props.visaStatus,
            visaExpiryDate: this.props.visaExpiryDate
        }

        this.renderVisaExpiry = this.renderVisaExpiry.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
    }
    save() {
        const data = Object.assign({}, this.state.newValues)
        this.props.saveProfileData(data)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visaStatus == "Work Visa" || nextProps.visaStatus == "Student Visa")
            return {
                visaStatus: nextProps.visaStatus,
                visaExpiryDate: nextProps.visaExpiryDate,
                showVisaExpiry: true
            }
        if (prevState != nextProps)
            return {
                visaStatus: nextProps.visaStatus,
                visaExpiryDate: nextProps.visaExpiryDate
            };
        return null
    }

    renderVisaExpiry() {
        let date = new Date(this.state.visaExpiryDate)
        let y = date.getFullYear().toString();
        let m = (date.getMonth() + 1).toString();
        let d = date.getDate().toString();
        (d.length == 1) && (d = '0' + d);
        (m.length == 1) && (m = '0' + m);
        let yyyymmdd = y + '-' + m + '-' + d;
        return (
            <div className="five wide field">
                <label>Visa Expiry Date</label>
                <input
                    type="date"
                    name="visaExpiryDate"
                    defaultValue={yyyymmdd}
                    onChange={this.handleChange}
                >
                </input>
            </div>
            )
    }

    handleChange(event) {
        let data = Object.assign({}, this.state.newValues)
        let name = event.target.value
        let value = event.target.value
        if (value === "Work Visa" || value === "Student Visa")
            this.setState({ showVisaExpiry: true })
        if (value === "Citizen" || value === "Permanent Resident")
            this.setState({ showVisaExpiry: false })
        data[event.target.name] = event.target.value
        this.setState({
            newValues: data
        })
        console.log(this.state.newValues)
    }

    render() {

        return (<div className="sixteen wide column">
            <div className="fields">
                <div className="five wide field">
                    <label>Visa type</label>
                    <select
                        name="visaStatus"
                        onChange={this.handleChange}
                    >
                        <option value={this.state.visaStatus}>{this.state.visaStatus}</option>
                        <option value="Citizen">Citizen</option>
                        <option value="Permanent Resident">Permanent Resident</option>
                        <option value="Work Visa">Work Visa</option>
                        <option value="Student Visa">Student Visa</option>
                    </select>
                </div>
                {this.state.showVisaExpiry ? this.renderVisaExpiry() : null}
                <div className="one wide field">
                    <button
                        style={{ marginLeft: "220px", marginTop: "20px" }}
                        type="button"
                        className="ui teal button"
                        onClick={this.save}
                    >Save</button>
                </div>
            </div>
        </div>
        )
    }
}