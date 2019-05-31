/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Icon, Image, Button } from 'semantic-ui-react'

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showUploadButton: true,
            showFilePicker: true,
            showSelectedPhoto: false,
            fileUrl: null
        }

        this.uploadPhoto = this.uploadPhoto.bind(this)
        this.openFilePicker = this.openFilePicker.bind(this)
        this.renderCameraIcon = this.renderCameraIcon.bind(this)
        this.renderSelectedPhoto = this.renderSelectedPhoto.bind(this)
        this.displayThumbnail = this.displayThumbnail.bind(this)
    };

    uploadPhoto() {
        this.props.updateProfileData(this.state.fileUrl)
        this.setState({ showUploadButton: false })
    }

    openFilePicker() {
        document.getElementById("file1").click();
    }
    displayThumbnail(event) {
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            let url = e.target.result
            this.setState({
                showFilePicker: false,
                showSelectedPhoto: true,
                fileUrl: url
            })
        }
    }

    renderCameraIcon() {
        return (
            <div className="ui sixteen wide column">
                <div style={{ marginLeft: "300px" }}>
                    <Icon onClick={this.openFilePicker} name="camera retro" size="massive" bordered="true" circular="true">
                    </Icon>
                    <input type="file" id="file1" style={{ display: "none" }} onChange={this.displayThumbnail}>
                    </input>
                </div>
            </div>)
    }
    renderSelectedPhoto() {
        return (
            <div className="ui sixteen wide column">
                <div style={{ marginLeft: "280px" }}>
                    <Image src={this.state.fileUrl} size="small" circular="true">
                    </Image>
                    {this.state.showUploadButton ?
                        <div style={{ marginTop: "10px" }}>
                            <Button type="button" color='teal' onClick={this.uploadPhoto}>
                                <Icon name='upload' /> Upload
                        </Button>
                        </div> : null
                    }
                </div>
            </div>
        )
    }
    render() {
        if (this.state.showFilePicker)
            return this.renderCameraIcon()
        if (this.state.showSelectedPhoto)
            return this.renderSelectedPhoto()
    }
}
