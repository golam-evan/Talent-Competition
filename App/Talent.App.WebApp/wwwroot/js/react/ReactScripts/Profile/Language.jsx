/* Language section */
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
            currentLanguage: {
                language: "",
                languageLevel:"Basic"
            },
            editCurrentLanguage: {
                language: "",
                languageLevel: ""
            },
            language: "",
            languageLevel: "Basic",
            editLanguage: "",
            editLanguageLevel: "",
            index:0
        }

        this.deleteLanguage = this.deleteLanguage.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.handleUpdateChange = this.handleUpdateChange.bind(this)
        this.setUpdateLanguage = this.setUpdateLanguage.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.renderUpdate = this.renderUpdate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.showAdd = this.showAdd.bind(this)
        this.saveLanguageInParent = this.saveLanguageInParent.bind(this)
        this.setLanguage = this.setLanguage.bind(this)
        this.openUpdate = this.openUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)
    }
    deleteLanguage(index) {
        let languages = this.state.newValues
        languages.splice(index, 1)
        this.props.updateProfileData(languages)
    }
    updateLanguage(event) {
        event.preventDefault()
        let languages = this.state.newValues
        let language = this.state.editCurrentLanguage
        let index = this.state.index
        languages[index] = language
        this.props.updateProfileData(languages)
    }
    closeUpdate() {
        this.setState({ showUpdate: !this.state.showUpdate })
    }
    openUpdate(item, index) {
        let language = {
            language: item.language,
            languageLevel: item.languageLevel
        }
        this.setState({
            editLanguage: item.language,
            editLanguageLevel: item.languageLevel,
            showUpdate: !this.state.showUpdate,
            editCurrentLanguage: language,
            index
        })
        
    }
    showAdd() { 
        this.setState({
            showAdd: !this.state.showAdd,
            languageLevel:"Basic"
        })
    }
    saveLanguageInParent() {
        let languages = this.state.newValues
        languages.push(this.state.currentLanguage)
        this.props.updateProfileData(languages)
    }
    setLanguage() {
        let language = {
            language: this.state.language,
            languageLevel: this.state.languageLevel
        }
        this.setState({ currentLanguage: language })
        
    }
    setUpdateLanguage() {
        let language = {
            language: this.state.editLanguage,
            languageLevel: this.state.editLanguageLevel
        }
        this.setState({ editCurrentLanguage: language })
    }
    handleUpdateChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "language")
            this.setState({ editLanguage: value }, () => this.setUpdateLanguage())
        if (name === "languageLevel")
            this.setState({ editLanguageLevel: value }, () => this.setUpdateLanguage())  
    }
    handleChange(event) { 
        let name = event.target.name
        let value = event.target.value
        if (name === "language")
            this.setState({ language: value }, () => this.setLanguage())
        if (name === "languageLevel")
            this.setState({ languageLevel: value }, () => this.setLanguage())    
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.newValues !== nextProps.languageData) {
            return ({ newValues: nextProps.languageData })
        }
        return null
    }

    renderUpdate() {
        return (
            <div className="ui sixteen wide column">
                <div className="fields">
                    <div className="field">
                        <input
                            name="language"
                            type="text"
                            defaultValue={this.state.editLanguage}
                            onChange={this.handleUpdateChange}
                        >
                        </input>
                    </div>
                    <div className="field">
                        <select
                            name="languageLevel"
                            defaultValue={this.state.editLanguageLevel}
                            onChange={this.handleUpdateChange}
                        >
                            <option value="Basic">Basic</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native/Bilingual">Native/Bilingual</option>
                        </select>
                    </div>
                    <Button basic color="blue" onClick={this.updateLanguage}>Update</Button>
                    <Button basic color="red" onClick={this.closeUpdate}>Cancel</Button>
                </div>
            </div>)
    }
    renderAdd() {
        return(
        <div className="ui sixteen wide column">
            <div className="fields">
                <div className="field">
                        <input
                            name="language"
                            type="text"
                            placeholder="Add Language"
                            onChange={this.handleChange}
                        >
                        </input>
                </div>
                <div className="field">
                        <select
                            name="languageLevel"
                            defaultValue="Basic"
                            onChange={this.handleChange}
                        >
                            <option value="Basic">Basic</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native/Bilingual">Native/Bilingual</option>
                        </select>
                    </div>
                    <button type="button" className="ui teal button" onClick={this.saveLanguageInParent}>Add</button>
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
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell textAlign="right">
                                    <button type="button" className="ui teal button" onClick={this.showAdd}>
                                    <Icon name="plus"></Icon>
                                    Add New</button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                        <Table.Body>
                            {this.state.newValues ? this.state.newValues.map((item,index) =>
                                <Table.Row key={Math.random() * 100}>
                                    <Table.Cell>{item.language}</Table.Cell>
                                    <Table.Cell>{item.languageLevel}</Table.Cell>
                                    <Table.Cell textAlign="right">
                                        <Icon name="pencil" onClick={() => this.openUpdate(item, index)}></Icon>
                                        <Icon name="close" onClick={()=>this.deleteLanguage(index)}></Icon>
                                    </Table.Cell>
                                </Table.Row>) : null}
                    </Table.Body>
                </Table>
                </div>
            </div>
            )

    }
}