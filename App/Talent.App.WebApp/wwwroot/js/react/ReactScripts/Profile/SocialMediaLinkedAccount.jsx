/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Label, Icon, Button } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const details = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }
        this.state = {
            showEditSection: false,
            newSocialMediaAccount: details           
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveSocialMediaLinkedAccount = this.saveSocialMediaLinkedAccount.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    componentDidMount() {
        
    }
    saveSocialMediaLinkedAccount() {
        const data = Object.assign({}, this.state.newSocialMediaAccount)
        this.props.saveProfileData(data)
        this.closeEdit()
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newSocialMediaAccount)
        data[event.target.name] = event.target.value
        this.setState({
            newSocialMediaAccount: data
        })
    }

    openEdit() {
        const details = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            newSocialMediaAccount: details,
            showEditSection: true
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
            )
    }

    renderEdit() {
        return (<div className='ui sixteen wide column'>
            <ChildSingleInput
                inputType="text"
                label="LinkedIn"
                name="linkedIn"
                value={this.state.newSocialMediaAccount.linkedIn}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your LinkedIn Url"
                errorMessage="Please enter a valid LinkedIn Url"
            />
            <ChildSingleInput
                inputType="text"
                label="GitHub"
                name="github"
                value={this.state.newSocialMediaAccount.github}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your GitHub Url"
                errorMessage="Please enter a valid GitHub Url"
            />           
            <button type="button" className="ui teal button" onClick={this.saveSocialMediaLinkedAccount}>Save</button>
            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
        </div>)
    }

    renderDisplay() {
        return (
            <div className="ui sixteen wide column">
                <div className="fields">
                    <div className="field">
                        <Button type="button" color='linkedin'>
                            <Icon name='linkedin' /> LinkedIn
                        </Button>
                    </div>
                    <div className="field">
                        <Button type="button" color='grey'>
                            <Icon name='github' /> GitHub
                        </Button>
                    </div>
                    <div className="field">
                        <input type="button" className="ui teal button float right" value="Edit" style={{ marginLeft:"469px" }} onClick={this.openEdit}></input>
                    </div>
                </div>
            </div>
            )
    }

}