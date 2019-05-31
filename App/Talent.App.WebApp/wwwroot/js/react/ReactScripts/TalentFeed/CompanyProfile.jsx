import React from 'react';
import { Loader, Card, Icon, Header } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Card fluid="true">
                <Card.Content>
                    <Header as='h2' icon>
                        <Icon name='image' />
                        {this.props.name}                                              
                    </Header>
                    <div style={{ textAlign: "center" }}>
                        <Icon name="marker"></Icon>
                        {this.props.location}
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <Icon name="phone"></Icon>
                    :{this.props.phone}
                    <br></br>
                    <Icon name="mail"></Icon>
                    :{this.props.email}
                </Card.Content>
            </Card>
            )
    }
}