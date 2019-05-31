/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon, Button } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newValues: [],
            showAdd: false,
            showUpdate: false,
            currentSkill: {
                skill: "",
                experienceLevel: ""
            },
            editCurrentSkill: {
                skill: "",
                experienceLevel: ""
            },
            skill: "",
            experienceLevel: "Beginner",
            editSkill: "",
            editExperienceLevel: "",
            index: 0
        }

        this.deleteSkill = this.deleteSkill.bind(this)
        this.updateSkill = this.updateSkill.bind(this)
        this.handleUpdateChange = this.handleUpdateChange.bind(this)
        this.setUpdateSkill = this.setUpdateSkill.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.renderUpdate = this.renderUpdate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.showAdd = this.showAdd.bind(this)
        this.saveSkillInParent = this.saveSkillInParent.bind(this)
        this.setSkill = this.setSkill.bind(this)
        this.openUpdate = this.openUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)
    }
    deleteSkill(index) {
        let skills = this.state.newValues
        skills.splice(index, 1)
        this.props.updateProfileData(skills)
    }
    updateSkill(event) {
        event.preventDefault()
        let skills = this.state.newValues
        let skill = this.state.editCurrentSkill
        let index = this.state.index
        skills[index] = skill
        this.props.updateProfileData(skills)
    }
    closeUpdate() {
        this.setState({ showUpdate: !this.state.showUpdate })
    }
    openUpdate(item, index) {
        let skill = {
            skill: item.skill,
            experienceLevel: item.experienceLevel
        }
        this.setState({
            editSkill: item.skill,
            editLanguageLevel: item.experienceLevel,
            showUpdate: !this.state.showUpdate,
            editCurrentSkill: skill,
            index
        })

    }
    showAdd() {
        this.setState({
            showAdd: !this.state.showAdd,
            experienceLevel:"Beginner"
        })
    }
    saveSkillInParent() {
        let skills = this.state.newValues
        skills.push(this.state.currentSkill)
        this.props.updateProfileData(skills)
    }
    setSkill() {
        let skill = {
            skill: this.state.skill,
            experienceLevel: this.state.experienceLevel
        }
        this.setState({ currentSkill: skill })

    }
    setUpdateSkill() {
        let skill = {
            skill: this.state.editSkill,
            experienceLevel: this.state.editExperienceLevel
        }
        this.setState({ editCurrentSkill: skill })
    }
    handleUpdateChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "skill")
            this.setState({ editSkill: value }, () => this.setUpdateSkill())
        if (name === "experienceLevel")
            this.setState({ editExperienceLevel: value }, () => this.setUpdateSkill())
    }
    handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "skill")
            this.setState({ skill: value }, () => this.setSkill())
        if (name === "experienceLevel")
            this.setState({ experienceLevel: value }, () => this.setSkill())
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.newValues !== nextProps.skillData) {
            return ({ newValues: nextProps.skillData })
        }
        return null
    }

    renderUpdate() {
        return (
            <div className="ui sixteen wide column">
                <div className="fields">
                    <div className="field">
                        <input
                            name="skill"
                            type="text"
                            defaultValue={this.state.editSkill}
                            onChange={this.handleUpdateChange}
                        >
                        </input>
                    </div>
                    <div className="field">
                        <select
                            name="experienceLevel"
                            defaultValue={this.state.editExperienceLevel}
                            onChange={this.handleUpdateChange}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <Button basic color="blue" onClick={this.updateSkill}>Update</Button>
                    <Button basic color="red" onClick={this.closeUpdate}>Cancel</Button>
                </div>
            </div>)
    }
    renderAdd() {
        return (
            <div className="ui sixteen wide column">
                <div className="fields">
                    <div className="field">
                        <input
                            name="skill"
                            type="text"
                            placeholder="Add Skill"
                            onChange={this.handleChange}
                        >
                        </input>
                    </div>
                    <div className="field">
                        <select
                            name="experienceLevel"
                            defaultValue="Beginner"
                            onChange={this.handleChange}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <button type="button" className="ui teal button" onClick={this.saveSkillInParent}>Add</button>
                    <button type="button" className="ui button" onClick={this.showAdd}>Cancel</button>
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
                                <Table.HeaderCell>Skill</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
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
                                    <Table.Cell>{item.skill}</Table.Cell>
                                    <Table.Cell>{item.experienceLevel}</Table.Cell>
                                    <Table.Cell textAlign="right">
                                        <Icon name="pencil" onClick={() => this.openUpdate(item, index)}></Icon>
                                        <Icon name="close" onClick={() => this.deleteSkill(index)}></Icon>
                                    </Table.Cell>
                                </Table.Row>) : null}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        )

    }
}

