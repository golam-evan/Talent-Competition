import React from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import Language from './Language.jsx';
import Skill from './Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx'
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Experience from './Experience.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profileData: {},
            loaderData: loaderData,

        }

        this.saveExperience = this.saveExperience.bind(this)
        this.saveSkills = this.saveSkills.bind(this)
        this.saveLanguages = this.saveLanguages.bind(this)
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateAndSaveData = this.updateAndSaveData.bind(this)
        this.updateForComponentId = this.updateForComponentId.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.loadData = this.loadData.bind(this)
        this.init = this.init.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(res)
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
        this.init()
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        })
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {
        console.log(newValues)
        let newProfile = Object.assign({}, this.state.profileData)
        if (newValues.linkedIn)
            newProfile.linkedAccounts.linkedIn = newValues.linkedIn
        if (newValues.github)
            newProfile.linkedAccounts.github = newValues.github
        if (newValues.summary)
            newProfile.summary = newValues.summary
        if (newValues.description)
            newProfile.description = newValues.description
        if (newValues.firstName)
            newProfile.firstName = newValues.firstName
        if (newValues.lastName)
            newProfile.lastName = newValues.lastName
        if (newValues.email)
            newProfile.email = newValues.email
        if (newValues.phone)
            newProfile.phone = newValues.phone
        if (newValues.number)
            newProfile.address.number = newValues.number
        if (newValues.street)
            newProfile.address.street = newValues.street
        if (newValues.suburb)
            newProfile.address.suburb = newValues.suburb
        if (newValues.country)
            newProfile.address.country = newValues.country
        if (newValues.city)
            newProfile.address.city = newValues.city
        if (newValues.postCode)
            newProfile.address.postCode = newValues.postCode
        if (newValues.nationality)
            newProfile.nationality = newValues.nationality
        if (newValues.visaStatus)
            newProfile.visaStatus = newValues.visaStatus
        if (newValues.visaExpiryDate)
            newProfile.visaExpiryDate = newValues.visaExpiryDate
        if (newValues.status)
            newProfile.jobSeekingStatus.status = newValues.status
        newProfile.profilePhoto=newValues
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }
    saveLanguages(newValues) {
        let newProfile = Object.assign({}, this.state.profileData)
        newProfile.languages = newValues
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }
    //UpdateAndSaveSkills
    saveSkills(newValues) {
        let newProfile = Object.assign({}, this.state.profileData)
        newProfile.skills = newValues
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }
    saveExperience(newValues) {
        let newProfile = Object.assign({}, this.state.profileData)
        newProfile.experience = newValues
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }
    updateForComponentId(componentId, newValues) {
        this.updateAndSaveData(newValues)
    }

    saveProfile() {
        console.log(this.state.profileData)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.profileData),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        const profile = {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            email: this.state.profileData.email,
            phone: this.state.profileData.phone
        }
        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">
                                        <FormItemWrapper
                                            title='Linked Accounts'
                                            tooltip='Linking to online social networks adds credibility to your profile'
                                        >
                                            <SocialMediaLinkedAccount
                                                linkedAccounts={this.state.profileData.linkedAccounts}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Description'
                                            tooltip='A short description about yourself.'
                                        >
                                            <SelfIntroduction
                                                summary={this.state.profileData.summary}
                                                description={this.state.profileData.description}
                                                updateProfileData={this.updateAndSaveData}
                                                updateWithoutSave={this.updateWithoutSave}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='User Details'
                                            tooltip='Enter your contact details'
                                        >
                                            <IndividualDetailSection
                                                controlFunc={this.updateForComponentId}
                                                details={profile}
                                                componentId='contactDetails'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Address'
                                            tooltip='Enter your current address'>
                                            <Address
                                                addressData={this.state.profileData.address}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Nationality'
                                            tooltip='Select your nationality'
                                        >
                                            <Nationality
                                                nationalityData={this.state.profileData.nationality}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Languages'
                                            tooltip='Select languages that you speak'
                                        >
                                            <Language
                                                languageData={this.state.profileData.languages}
                                                updateProfileData={this.saveLanguages}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Skills'
                                            tooltip='List your skills'
                                        >
                                            <Skill
                                                skillData={this.state.profileData.skills}
                                                updateProfileData={this.saveSkills}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Work experience'
                                            tooltip='Add your work experience'
                                        >
                                            <Experience
                                                experienceData={this.state.profileData.experience}
                                                updateProfileData={this.saveExperience}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='What is your current Visa/Citizenship status?'
                                        >
                                            <VisaStatus
                                                visaStatus={this.state.profileData.visaStatus}
                                                visaExpiryDate={this.state.profileData.visaExpiryDate}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Status'
                                            tooltip='What is your current status in jobseeking?'
                                        >
                                            <TalentStatus
                                                status={this.state.profileData.jobSeekingStatus}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Photo'
                                            tooltip='Please upload your profile photo'
                                            hideSegment={true}
                                        >
                                            <PhotoUpload
                                                imageId={this.state.profileData.profilePhotoUrl}
                                                updateProfileData={this.updateAndSaveData}
                                                savePhotoUrl='http://localhost:60290/profile/profile/updateProfilePhoto'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Video'
                                            tooltip='Upload a brief self-introduction video'
                                            hideSegment={true}
                                        >
                                            <VideoUpload
                                                videoName={this.state.profileData.videoName}
                                                updateProfileData={this.updateWithoutSave}
                                                saveVideoUrl={'http://localhost:60290/profile/profile/updateTalentVideo'}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='CV'
                                            tooltip='Upload your CV. Accepted files are pdf, doc & docx)'
                                            hideSegment={true}
                                        >
                                            <CVUpload
                                                cvName={this.state.profileData.cvName}
                                                cvUrl={this.state.profileData.cvUrl}
                                                updateProfileData={this.updateWithoutSave}
                                                saveCVUrl={'http://localhost:60290/profile/profile/updateTalentCV'}
                                            />
                                        </FormItemWrapper>
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
