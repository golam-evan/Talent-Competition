import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Icon, Card, Header, Grid, Button, Embed } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
       
    };

    
    
    render() {
        return (
            <div >
                <Card style={{ width: "650px" }}>
                    <div style={{ marginTop: "10px", marginLeft: "5px", marginBottom:"5px" }}>
                        <Header as='h2'>
                            <div style={{ float: "right" }}>
                                <Icon name='star'></Icon>
                            </div>
                            Uptime Guarantee
                        </Header>
                    </div>
                    <div style={{ overflow:"hidden" }}>
                        <Embed></Embed>
                    </div>
                    <Grid>
                        <Grid.Row textAlign="center" columns={4}>
                            <Grid.Column>
                                <div style={{ marginTop: "7px", marginBottom:"7px" }}>
                                    <Icon size="big" name="user"></Icon>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ marginTop: "7px", marginBottom: "7px" }}>
                                    <Icon size="big" name="file pdf outline"></Icon>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ marginTop: "7px", marginBottom: "7px" }}>
                                    <Icon size="big" name="linkedin"></Icon>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ marginTop: "7px", marginBottom: "7px" }}>
                                    <Icon size="big" name="github"></Icon>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Card.Content>
                        <Button basic color='blue' content='C#'></Button>
                    </Card.Content>
                </Card>
            </div>
            )
    }
}

