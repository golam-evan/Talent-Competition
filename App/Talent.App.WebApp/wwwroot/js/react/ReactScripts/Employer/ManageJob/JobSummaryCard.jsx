import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, Button, Label } from 'semantic-ui-react';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        //this.selectJob = this.selectJob.bind(this)
    }

    //selectJob(id) {
    //    var cookies = Cookies.get('talentAuthToken');
    //    //url: 'http://localhost:51689/listing/listing/closeJob',
    //}

    render() {
        return(
        <div className="card-width">
            <Card fluid="true">
                    <Card.Content>
                        <Card.Header>{this.props.header}</Card.Header>
                    <Label color="black" ribbon="right">
                        <Icon name="user"></Icon>
                        0
                            </Label>
                        <Card.Meta>{this.props.subHeader}</Card.Meta>
                    <div className="card-description-height">
                            <Card.Description>
                                {this.props.description}
                                </Card.Description>
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <div>
                        <Button negative size="mini" floated="left">Expired</Button>
                        <Button.Group floated="right" size="mini">
                            <Button basic color='blue'>
                                <Icon name="ban"></Icon>
                                Close
                                </Button>
                            <Button basic color='blue'>
                                <Icon name="edit"></Icon>
                                Edit
                                </Button>
                            <Button basic color='blue'>
                                <Icon name="copy"></Icon>
                                Copy
                                </Button>
                        </Button.Group>
                    </div>
                </Card.Content>
            </Card>
        </div>)
    }
}