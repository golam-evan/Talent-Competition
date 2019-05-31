import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx'
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { Grid } from 'semantic-ui-react';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null,
            companyContact: {},
            location: "",
            talentList:[]
        }

        this.loadTalentList = this.loadTalentList.bind(this)
        this.init = this.init.bind(this);
        this.loadEmployer = this.loadEmployer.bind(this)

    };


    loadTalentList() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalentList',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res)
            }.bind(this),
            error: function (res) {
                console.log(res)
            }
        })
    }

    loadEmployer() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                    let companyContact = employerData.companyContact
                    let city = employerData.companyContact.location.city
                    let country = employerData.companyContact.location.country
                    let location = city + "," + country
                    console.log(employerData)
                    this.setState({
                        companyDetails: employerData,
                        companyContact,
                        location

                    })
                }
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    init() {
        let loader = TalentUtil.deepCopy(this.state.loaderData)
        loader.isLoading = false
        this.loadEmployer()
        this.loadTalentList()
        this.setState({ loaderData: loader })
    }

    componentDidMount() {
        this.init()
    };

   
    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                <Grid divided="vertically">
                    <Grid.Row columns={3}>
                        <Grid.Column width={4} floated="left">
                            {this.state.companyDetails ?
                                <CompanyProfile
                                    name={this.state.companyContact.name}
                                    location={this.state.location}
                                    phone={this.state.companyContact.phone}
                                    email={this.state.companyContact.email}
                                ></CompanyProfile> : null}
                        </Grid.Column>
                        <Grid.Column width={8}>
                                <TalentCard></TalentCard>
                        </Grid.Column>
                        <Grid.Column width={4} floated="right">
                            <FollowingSuggestion></FollowingSuggestion>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>    
                </div>
            </BodyWrapper>
        )
    }
}