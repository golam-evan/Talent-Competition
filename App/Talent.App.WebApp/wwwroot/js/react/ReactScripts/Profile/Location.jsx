import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        const details = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                postCode: 0,
                city: "",
                country: ""
            }

        this.state = {
            popCities: [],
            showEditSection: false,
            newAddress: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveNewAddress = this.saveNewAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.handleCountryChange = this.handleCountryChange.bind(this)

    }
    saveNewAddress() {
        const data = Object.assign({}, this.state.newAddress)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    handleCountryChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        let popCities = Countries[value].map(x => <option key={Math.random() * 10000} value={x}> {x}</option>);
        let newAddress = {
            number: this.state.newAddress.number,
            street: this.state.newAddress.street,
            suburb: this.state.newAddress.suburb,
            postCode: this.state.newAddress.postCode,
            city: this.state.newAddress.city,
            country: value
        }
        this.setState({ popCities, newAddress })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    openEdit() {
        const details = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: details
        })
        console.log(details)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderDisplay() {

        let number = this.props.addressData ? `${this.props.addressData.number}` : ""
        let street = this.props.addressData ? `${this.props.addressData.street}` : ""
        let suburb = this.props.addressData ? `${this.props.addressData.suburb}` : ""
        let postCode = this.props.addressData ? `${this.props.addressData.postCode}` : ""
        let address = number + "," + street + "," + suburb + "," + postCode
        let country = this.props.addressData ? this.props.addressData.country : ""
        let city = this.props.addressData ? this.props.addressData.city : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>Country: {country}</p>
                        <p>City: {city}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

    renderEdit() {
        let countriesOptions = [];
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            this.state.popCities = Countries[selectedCountry].map(x => <option key={Math.random() * 10000} value={x}> {x}</option>);
        }
        return (
            <div className="ui sixteen wide column">
                <div className="fields">
                    <div className="four wide field">
                        <ChildSingleInput
                            label="Number"
                            inputType="text"
                            name="number"
                            value={this.state.newAddress.number}
                            placeholder="Number"
                            maxLength="80"
                            controlFunc={this.handleChange}
                            errorMessage=""
                        />
                    </div>
                    <div className="eight wide field">
                        <ChildSingleInput
                            label="Street"
                            inputType="text"
                            name="street"
                            value={this.state.newAddress.street}
                            placeholder="Street"
                            maxLength="80"
                            controlFunc={this.handleChange}
                            errorMessage=""
                        />
                    </div>
                    <div className="four wide field">
                        <ChildSingleInput
                            label="Suburb"
                            inputType="text"
                            name="suburb"
                            value={this.state.newAddress.suburb}
                            placeholder="Suburb"
                            maxLength="80"
                            controlFunc={this.handleChange}
                            errorMessage=""
                        />
                    </div>
                </div>
                <div className="fields">
                    <div className="six wide field">
                        <label>Country</label>
                        <select
                            placeholder="Country"
                            defaultValue={selectedCountry}
                            onChange={this.handleCountryChange}
                            name="country">

                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>
                    </div>
                    <div className="six wide field">
                        <label>City</label>
                        <select
                            placeholder="City"
                            value={selectedCity}
                            onChange={this.handleChange}
                            name="city">

                            <option value="">Select a town or city</option>
                            {this.state.popCities}
                        </select>
                    </div>
                    <ChildSingleInput
                        label="Post Code"
                        inputType="number"
                        name="postCode"
                        value={this.state.newAddress.postCode}
                        placeholder="Post Code"
                        maxLength="80"
                        controlFunc={this.handleChange}
                        errorMessage=""
                    />
                </div>
                <div className="ui sixteen wide column">
                    <button type="button" className="ui teal button" onClick={this.saveNewAddress}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </div>
        )
    }

}

export class Nationality extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            newValues: {
                nationality: this.props.nationalityData
            },
            nationality: this.props.nationalityData
        }
        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.nationality !== nextProps.nationalityData)
            return { nationality: nextProps.nationalityData };
        return null
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newValues)
        data[event.target.name] = event.target.value
        this.setState({
            newValues: data
        })
    }
    save() {
        const data = Object.assign({}, this.state.newValues)
        this.props.saveProfileData(data)
    }

    render() {
        let countriesOptions = [];
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        return (
            <div className="ui sixteen wide column">
                <div className="fields">
                    <div className="field">
                        <div className="five wide column">
                            <select
                                onChange={this.handleChange}
                                name="nationality">
                                <option value="">{this.state.nationality}</option>
                                {countriesOptions}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <button type="button" style={{ marginLeft: "480px" }} className="ui teal button" onClick={this.save}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}