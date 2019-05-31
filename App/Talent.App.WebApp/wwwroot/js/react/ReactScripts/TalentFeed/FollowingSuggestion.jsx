import React from 'react';
import { Card, Image, Header } from 'semantic-ui-react'


export default class FollowingSuggestion extends React.Component {
    render() {
        return (
            <Card>
                <div style={{ marginTop:"10px" }}>
                    <Header textAlign="center" as="h3">Follow Talent</Header>
                </div>
                <div style={{ marginLeft:"35px" }} className="ui items following-suggestion">
                       <div className="item">
                            <Image bordered="true" circular="true" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" ></Image>
                        <div className="content">
                            <a className="">Veronika Ossi</a>
                            <button className="ui primary basic button"><i className="icon user"></i>Follow</button>
                        </div>
                    </div>
                    <div className="item">
                                <Image bordered="true" circular="true" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" ></Image>
                        <div className="content">
                            <a className="">Veronika Ossi</a>
                            <button className="ui primary basic button"><i className="icon user"></i>Follow</button>
                        </div>
                    </div>
                    </div>
                 </Card>
        )
    }
}