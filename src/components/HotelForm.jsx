import React, { Component } from "react";
import { LocationCity, LocationOn, Person, Phone } from "@material-ui/icons";

export default class HotelForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    position: "",
    number: "",
    hotelName: "",
    location: "",
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    try {
      fetch("https://shuttlelaneee.herokuapp.com/api/booking/hotel", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="hotelForm">
        <h2 style={{ color: "#000080", textAlign: "center" }}>
          Hotel Transfer Solution
        </h2>
        <form onSubmit={this.onSubmitHandler} className="checkoutForm">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="inputControl">
              <span>
                {" "}
                <Person />{" "}
              </span>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                required
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
            </div>
            <div className="inputControl">
              <span>
                {" "}
                <Person />{" "}
              </span>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                required
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="inputControl">
              <span>
                <Person />{" "}
              </span>
              <input
                type="text"
                name="position"
                id="position"
                placeholder="Position"
                required
                value={this.state.position}
                onChange={(e) => this.setState({ position: e.target.value })}
              />
            </div>

            <div className="inputControl">
              <span>
                <Phone />
              </span>
              <input
                type="tel"
                name="number"
                id="number"
                placeholder="Contact"
                required
                value={this.state.number}
                onChange={(e) => this.setState({ number: e.target.value })}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="inputControl">
              <span>
                {" "}
                <LocationCity />{" "}
              </span>
              <input
                type="text"
                name="hotelName"
                id="hotelName"
                placeholder="Hotel Name"
                required
                value={this.state.hotel}
                onChange={(e) => this.setState({ hotelName: e.target.value })}
              />
            </div>
            <div className="inputControl">
              <span>
                {" "}
                <LocationOn />{" "}
              </span>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                required
                value={this.state.location}
                onChange={(e) => this.setState({ location: e.target.value })}
              />
            </div>
          </div>
          <button className="btnGrad" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
