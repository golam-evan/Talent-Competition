import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import { Icon, Card, Header, Grid, Button, Image } from 'semantic-ui-react'

export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);

    };
    render() {
        return (
            <div >
                <Card style={{ width: "650px" }}>
                    <div style={{ marginTop: "10px", marginLeft: "5px", marginBottom: "10px" }}>
                        <Header as='h2'>
                            <div style={{ float: "right" }}>
                                <Icon name='star'></Icon>
                            </div>
                            Uptime Guarantee
                        </Header>
                    </div>
                    <div>
                        <div style={{ borderTop: "1px solid #e6e8ed", borderBottom: "1px solid #e6e8ed" }}>
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <div style={{ height: "250px", overflow: "hidden" }}>
                                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'></Image>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <div style={{ marginTop: "10px" }}>
                                            <Header as='h3'>
                                                Talent snapshot
                                    <div style={{ marginTop: "10px" }}>
                                                    <Header.Subheader>
                                                        CURRENT EMPLOYER
                                    </Header.Subheader>
                                                    <Header.Subheader>
                                                        props
                                    </Header.Subheader>
                                                </div>
                                                <div style={{ marginTop: "7px" }}>
                                                    <Header.Subheader>
                                                        VISA STATUS
                                    </Header.Subheader>
                                                    <Header.Subheader>
                                                        props
                                    </Header.Subheader>
                                                </div>
                                                <div style={{ marginTop: "7px" }}>
                                                    <Header.Subheader>
                                                        POSITION
                                    </Header.Subheader>
                                                    <Header.Subheader>
                                                        props
                                    </Header.Subheader>
                                                </div>
                                            </Header>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                    <Grid>
                        <Grid.Row textAlign="center" columns={4}>
                            <Grid.Column>
                                <div style={{ marginTop: "7px", marginBottom: "7px" }}>
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