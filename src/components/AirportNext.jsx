import React, { useState } from "react";
import { Card } from "@material-ui/core";
import {
  FlightLand,
  Today,
  AccessTime,
  LocalAirport,
  ArrowForward,
  PeopleAlt,
  LocationOn,
} from "@material-ui/icons";
import next from "../styles/Next.module.css";
let date = new Date().toISOString().substr(0, 10);
const AirportNext = ({ data, setData }) => {
  const onChangeHandler = (e) => {
    console.log("Nameeeee", e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Card style={{ backgroundColor: "#fff", marginTop: "6rem" }}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: ".5rem 1.5rem",
            borderBottom: "1px solid #212121",
          }}
        >
          <h4
            style={{
              margin: "0",
              padding: "0",
              textTransform: "uppercase",
            }}
          >
            {data?.formType} Info
          </h4>
        </div>
        <form className="checkoutForm">
          <div
            className="formGroup"
            style={{ marginTop: ".5rem", justifyContent: "space-around" }}
          >
            <div className="inputControl">
              <span>
                <FlightLand fontSize="small" />
              </span>
              <select
                name="pickupAirport"
                id="pickupAirport"
                value={data?.pickupAirport?.split("+").join(" ")}
                onChange={onChangeHandler}
              >
                <option defaultValue disabled value="null" id="null">
                  Select pickup Airport
                </option>
                <option value="Murtala Muhammed International Airport">
                  Murtala Muhammed International Airport
                </option>
                <option value="Murtala Muhammed Domestic Airport">
                  Murtala Muhammed Domestic Airport
                </option>
                {/* <option value="Port Harcourt International Airport">
                  Port Harcourt International Airport
                </option>
                <option value="Nnamdi Azikwe International Airport">
                  Nnamdi Azikwe International Airport
                </option>
                <option value="Kotoka International Airport">
                  Kotoka International Airport
                </option>
                <option value="Kumasi Airport">Kumasi Airport</option>
                <option value="London Heathrow Airport">
                  London Heathrow Airport
                </option>
                <option value="Gatwick Airport">Gatwick Airport</option>
                <option value="London City Airport">London City Airport</option> */}
              </select>
            </div>

            <div className="inputControl">
              <span>
                <LocationOn fontSize="small" />
              </span>
              <input
                type="text"
                name="dropoffAddress"
                placeholder="Drop-off Address"
                value={data?.dropoffAddress?.split("+").join(" ")}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="formGroup" style={{ justifyContent: "space-around" }}>
            <div className="inputControl">
              <span>
                <Today fontSize="small" />
              </span>
              <input
                type="date"
                name="arrivalDate"
                id="dropoffDate"
                value={data?.arrivalDate}
                onChange={onChangeHandler}
                min={date}
              />
            </div>
            <div className="inputControl">
              <span>
                <PeopleAlt fontSize="small" />
              </span>
              <input
                type="number"
                name="passengers"
                value={data?.passengers}
                id="passenger"
                placeholder="Number of Passengers"
                onChange={onChangeHandler}
              />
              {/* <select name="airport" id="dropoffAirport">
                  <option defaultValue disabled value="null" id="null">
                    Select Dropoff Airport
                  </option>
                  <option value="Murtala Muhammed International Airport">
                    Murtala Muhammed International Airport
                  </option>
                  <option value="Murtala Muhammed Domestic Airport">
                    Murtala Muhammed Domestic Airport
                  </option>
                  <option value="Port Harcourt International Airport">
                    Port Harcourt International Airport
                  </option>
                  <option value="Nnamdi Azikwe International Airport">
                    Nnamdi Azikwe International Airport
                  </option>
                  <option value="Kotoka International Airport">
                    Kotoka International Airport
                  </option>
                  <option value="Kumasi Airport">Kumasi Airport</option>
                  <option value="London Heathrow Airport">
                    London Heathrow Airport
                  </option>
                  <option value="Gatwick Airport">Gatwick Airport</option>
                  <option value="London City Airport">
                    London City Airport
                  </option>
                </select> */}
            </div>
          </div>
          <div className="formGroup" style={{ justifyContent: "space-around" }}>
            <div className="inputControl">
              <span>
                <AccessTime fontSize="small" />
              </span>
              <input
                type="time"
                name="time"
                value={data?.time}
                id="time"
                placeholder="Select time"
                onChange={onChangeHandler}
              />
            </div>
            <div className="inputControl">
              <span>
                <LocalAirport fontSize="small" />
              </span>
              <input
                type="text"
                name="flightNumber"
                onChange={onChangeHandler}
                value={data?.flightNumber}
                placeholder="Enter Flight Number"
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AirportNext;
