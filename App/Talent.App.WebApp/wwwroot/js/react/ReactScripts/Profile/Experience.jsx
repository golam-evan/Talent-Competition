/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon } from 'semantic-ui-react';


export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newValues: [],
            showAdd: false,
            showUpdate: false,
            currentExperience: {
                company: "",
                position: "",
                start: Date,
                end: Date,
                responsibilities:""
            },
            editCurrentExperience: {
                company: "",
                position: "",
                start: Date,
                end: Date,
                responsibilities: ""
            },
            company: "",
            position: "",
            start: Date,
            end: Date,
            responsibilities: "",
            editCompany: "",
            editPosition: "",
            editstart: Date,
            editend: Date,
            editResponsibilities: "",
            index: 0
        }

        this.deleteExperience = this.deleteExperience.bind(this)
        this.updateExperience = this.updateExperience.bind(this)
        this.handleUpdateChange = this.handleUpdateChange.bind(this)
        this.setUpdateExperience = this.setUpdateExperience.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.renderUpdate = this.renderUpdate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.showAdd = this.showAdd.bind(this)
        this.saveExperienceInParent = this.saveExperienceInParent.bind(this)
        this.setExperience = this.setExperience.bind(this)
        this.openUpdate = this.openUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)
       
    };

    deleteExperience(index) {
        let experiences = this.state.newValues
        experiences.splice(index, 1)
        this.props.updateProfileData(experiences)
    }
    updateExperience() {
        let experiences = this.state.newValues
        let experience = this.state.editCurrentExperience
        let index = this.state.index
        experiences[index] = experience
        this.props.updateProfileData(experiences)
    }
    closeUpdate() {
        this.setState({ showUpdate: !this.state.showUpdate })
    }
    openUpdate(item, index) {
        console.log(item)
        this.setState({
            editCompany: item.company,
            editPosition: item.position,
            editstart: item.start,
            editend: item.end,
            editResponsibilities: item.responsibilities,
            showUpdate: !this.state.showUpdate,
            index
        })

    }
    showAdd() {
        this.setState({ showAdd: !this.state.showAdd })
    }
    saveExperienceInParent() {
        let experiences = this.state.newValues
        experiences.push(this.state.currentExperience)
        this.props.updateProfileData(experiences)
    }
    setExperience() {
        let experience = {
            company: this.state.company,
            position: this.state.position,
            start: this.state.start,
            end: this.state.end,
            responsibilities: this.state.responsibilities
        }
        this.setState({ currentExperience: experience })

    }
    setUpdateExperience() {
        let experience = {
            company: this.state.editCompany,
            position: this.state.editPosition,
            start: this.state.editstart,
            end: this.state.editend,
            responsibilities: this.state.editResponsibilities
        }
        this.setState({ editCurrentExperience: experience })
    }
    handleUpdateChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "company")
            this.setState({ editCompany: value }, () => this.setUpdateExperience())
        if (name === "position")
            this.setState({ editPosition: value }, () => this.setUpdateExperience())
        if (name === "start")
            this.setState({ editstart: value }, () => this.setUpdateExperience())
        if (name === "end")
            this.setState({ editend: value }, () => this.setUpdateExperience())
        if (name === "responsibilities")
            this.setState({ editResponsibilities: value }, () => this.setUpdateExperience())
    }
    handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "company")
            this.setState({ company: value }, () => this.setExperience())
        if (name === "position")
            this.setState({ position: value }, () => this.setExperience())
        if (name === "start")
            this.setState({ start: value }, () => this.setExperience())
        if (name === "end")
            this.setState({ end: value }, () => this.setExperience())
        if (name === "responsibilities")
            this.setState({ responsibilities: value }, () => this.setExperience())
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.newValues !== nextProps.experienceData) {
            return ({ newValues: nextProps.experienceData })
        }
        return null
    }
    renderUpdate() {
        return (<div className="ui sixteen wide column">
            <div className="fields">
                <div className="eight wide field">
                    <label>Company:</label>
                    <input
                        name="company"
                        type="text"
                        defaultValue={this.state.editCompany}
                        onChange={this.handleUpdateChange}
                    >
                    </input>
                </div>
                <div className="eight wide field">
                    <label>Position:</label>
                    <input
                        name="position"
                        type="text"
                        defaultValue={this.state.editPosition}
                        onChange={this.handleUpdateChange}
                    >
                    </input>
                </div>
            </div>
            <div className="fields">
                <div className="eight wide field">
                    <label>Start Date:</label>
                    <input
                        name="start"
                        type="date"
                        defaultValue={this.state.editstart}
                        onChange={this.handleUpdateChange}
                    >
                    </input>
                </div>
                <div className="eight wide field">
                    <label>End Date:</label>
                    <input
                        name="end"
                        type="date"
                        defaultValue={this.state.editend}
                        onChange={this.handleUpdateChange}
                    >
                    </input>
                </div>
            </div>
            <div className="fields">
                <div className="sixteen wide field">
                    <label>Responsibilities:</label>
                    <input
                        name="responsibilities"
                        type="text"
                        defaultValue={this.state.editResponsibilities}
                        onChange={this.handleUpdateChange}
                    >
                    </input>
                </div>
            </div>
            <div className="ui sixteen wide column">
                <button type="button" className="ui teal button" onClick={this.updateExperience} >Update</button>
                <button type="button" className="ui button" onClick={this.closeUpdate} >Cancel</button>
            </div>
        </div>)
    }
    renderAdd() {
        return(
        <div className="ui sixteen wide column">
            <div className="fields">
                <div className="eight wide field">
                        <label>Company:</label>
                        <input
                            name="company"
                            type="text"
                            placeholder="Company"
                            onChange={this.handleChange}
                        >
                        </input>
                </div>
                <div className="eight wide field">
                        <label>Position:</label>
                        <input
                            name="position"
                            type="text"
                            placeholder="Position"
                            onChange={this.handleChange}
                        >
                        </input>
                </div>
            </div>
            <div className="fields">
                <div className="eight wide field">
                        <label>Start Date:</label>
                        <input
                            name="start"
                            type="date"
                            onChange={this.handleChange}
                        >
                        </input>
                </div>
                <div className="eight wide field">
                        <label>End Date:</label>
                        <input
                            name="end"
                            type="date"
                            onChange={this.handleChange}
                        >
                        </input>
                </div>
            </div>
            <div className="fields">
                <div className="sixteen wide field">
                        <label>Responsibilities:</label>
                        <input
                            name="responsibilities"
                            type="text"
                            placeholder="Responsibilities"
                            onChange={this.handleChange}
                        >
                        </input>
                </div>
            </div>
                <div className="fields">
                    <button type="button" className="ui teal button" onClick={this.saveExperienceInParent}>Add</button>
                    <button type="button" className="ui button" onClick={this.showAdd} >Cancel</button>
            </div>
        </div>)
    }
    
    render() {
        return (
            <div className="ui sixteen wide column">
                {this.state.showAdd ? this.renderAdd() : null}
                {this.state.showUpdate ? this.renderUpdate() : null}
                <div className="ui sixteen wide column">
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>End</Table.HeaderCell>
                                <Table.HeaderCell textAlign="right">
                                    <button type="button" className="ui teal button" onClick={this.showAdd}>
                                        <Icon name="plus"></Icon>
                                        Add New</button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.newValues ? this.state.newValues.map((item, index) =>
                                <Table.Row key={Math.random() * 100}>
                                    <Table.Cell>{item.company}</Table.Cell>
                                    <Table.Cell>{item.position}</Table.Cell>
                                    <Table.Cell>{item.responsibilities}</Table.Cell>
                                    <Table.Cell>{TalentUtil.formatHelpers.formatDateWritten(item.start)}</Table.Cell>
                                    <Table.Cell>{TalentUtil.formatHelpers.formatDateWritten(item.end)}</Table.Cell>
                                    <Table.Cell textAlign="right">
                                        <Icon name="pencil" onClick={() => this.openUpdate(item, index)}></Icon>
                                        <Icon name="close" onClick={() => this.deleteExperience(index)}></Icon>
                                    </Table.Cell>
                                </Table.Row>) : null}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            )
    }
}
