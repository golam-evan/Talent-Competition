import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, Button, Label, Table, Menu } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            initalPage: 1,
            pageSize: 3,
            pageOfItems: [],
            pager: {
                pages:[]
            },
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.setPage = this.setPage.bind(this);
        this.getPager = this.getPager.bind(this);
        //your functions go here
    };

    init() {
        this.loadData()
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        //loaderData.isLoading = false

        //console.log(this.state.loaderData)
    }

    setPage(page) {
        let items = this.state.loadJobs;
        let pageSize = this.state.pageSize;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);

        // get new page of items from items array
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager, pageOfItems: pageOfItems });
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 3;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    componentDidMount() {
        this.init();
    };

    loadData() {
        //var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:51689/listing/listing/getSortedEmployerJobs',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                this.setState({ loadJobs: res.myJobs, pageOfItems: res.myJobs.slice(0, 3) })
                this.setPage(1)
                console.log(this.state.loadJobs)
                console.log(this.state.pageOfItems)
            }.bind(this)
        })
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h3>List of Jobs</h3>
                    <Icon name="filter"></Icon>Filter:
                    <Dropdown text='Choose filter' inline = 'true'>
                        <Dropdown.Menu>
                        </Dropdown.Menu>    
                    </Dropdown>
                    <Icon name="calendar alternate"></Icon>Sort by date:
                    <Dropdown text='Newest first' inline='true'>
                        <Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Table celled>
                        <Table.Body>
                            <Table.Row>
                                {this.state.pageOfItems.length > 0 ?
                                    this.state.pageOfItems.map(item =>
                                        <Table.Cell key={item.id}>
                                            <JobSummaryCard
                                                header={item.title}
                                                subHeader={item.status}
                                                description={item.summary}
                                            >
                                            </JobSummaryCard>
                                        </Table.Cell>)
                                    : null}
                            </Table.Row>
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
                                    <Menu floated='right' pagination>
                                        <Menu.Item as='a' icon onClick={() => this.setPage(this.state.pager.currentPage - 1)}>
                                            <Icon name='chevron left' />
                                        </Menu.Item>
                                        {this.state.pager.pages.map((page, index) => 
                                                <Menu.Item as="a" key={index} onClick={() => this.setPage(page)}>
                                                    {page}
                                                </Menu.Item>)
                                        }
                                        <Menu.Item as='a' icon onClick={() => this.setPage(this.state.pager.currentPage + 1)}>
                                            <Icon name='chevron right' />
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            </BodyWrapper>
        )
    }
}