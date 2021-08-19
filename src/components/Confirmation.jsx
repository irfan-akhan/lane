import React from "react";
import { Grid, Typography, Card } from "@material-ui/core";
import {
  FlightLand,
  Today,
  AccessTime,
  LocalAirport,
  ArrowForward,
  PeopleAlt,
  LocationOn,
  DriveEta,
  Contacts,
} from "@material-ui/icons";
import success from "../styles/Success.module.css";
const Confirmation = () => {
  return (
    <section style={{ marginTop: "6rem" }}>
      <Grid
        container
        spacing={2}
        xs={12}
        sm={8}
        md={6}
        xl={3}
        style={{
          margin: "auto",
        }}
        className={success.main}
      >
        <Grid item className={success.header}>
          <div className="Header">Payment Successful</div>
        </Grid>
        <Grid item container style={{ border: "1px solid #ccc" }}>
          <Typography variant="paragraph" className={success.message}>
            Thank You for your `type` booking with Shuttlelane
          </Typography>
          <br />

          <Typography variant="paragraph" className={success.message}>
            Your Booking Reference is `PNBJFHF34`
          </Typography>
          <Typography variant="paragraph" className={success.message}>
            Need assistance? You can reach us on
            <strong>+2349030009452, +2349030009486 or +2349030009108</strong>
          </Typography>
        </Grid>
        <Grid item className={success.header}>
          <div className="Header">BOOKING DETAILS</div>
        </Grid>
        <Grid
          item
          container
          style={{ border: "1px solid #ccc", borderBottom: "none" }}
        >
          <div className={success.detailContainer}>
            <div className={success.itemDetails}>
              <div className={success.icon}>
                <FlightLand color="#0393be" />
              </div>
              <div className={success.detail} style={{ marginLeft: "1.5rem" }}>
                <Typography variant="paragraph">
                  <strong>Pick-up</strong>
                </Typography>
                <br />
                <Typography variant="paragraph" className={success.para}>
                  Airport Name
                </Typography>
                <br />
                <Typography variant="paragraph" className={success.para}>
                  Flight Number: ''
                </Typography>
                <br />
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          item
          container
          style={{ border: "1px solid #ccc", borderBottom: "none" }}
        >
          <div className={success.detailContainer} style={{ width: "100%" }}>
            <div className={success.itemDetails}>
              <div className={success.icon}>
                <LocationOn />
              </div>
              <div className={success.detail} style={{ marginLeft: "1.5rem" }}>
                <Typography variant="paragraph">
                  <strong>Drop-off</strong>
                </Typography>
                <br />
                <Typography variant="paragraph" className={success.para}>
                  Airport Name
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          item
          container
          style={{
            border: "1px solid #ccc",
            borderBottom: "none",
          }}
        >
          <div className={success.detailContainer}>
            <div className={success.itemDetails}>
              <div className={success.icon}>
                <AccessTime color="#0393be" />
              </div>
              <div className={success.detail} style={{ marginLeft: "1.5rem" }}>
                <Typography variant="paragraph">
                  <strong>Date and Time</strong>
                </Typography>
                <br />
                <Typography variant="paragraph" className={success.para}>
                  29/10/1998
                </Typography>
              </div>
            </div>
            <div className={success.itemDetails}>
              <div className={success.icon}>
                <DriveEta color="#0393be" />
              </div>
              <div className={success.detail} style={{ marginLeft: "1.5rem" }}>
                <Typography variant="paragraph">
                  <strong>Vehicle Class</strong>
                </Typography>
                <br />
                <Typography variant="paragraph" className={success.para}>
                  Toyota Camry
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          item
          container
          style={{
            border: "1px solid #ccc",
            borderBottom: "none",
          }}
        >
          <div className={success.detailContainer}>
            <div className={success.itemDetails}>
              <div className={success.icon}>
                <PeopleAlt color="#0393be" />
              </div>
              <div className={success.detail} style={{ marginLeft: "1.5rem" }}>
                <Typography variant="paragraph">
                  <strong>Passengers</strong>
                </Typography>
                <br />
                <Typography variant="paragraph" className={success.para}>
                  23
                </Typography>
              </div>
            </div>
            <div className={success.itemDetails}>
              <div className={success.icon}>
                <Contacts color="#0393be" />
              </div>
              <div className={success.detail} style={{ marginLeft: "1.5rem" }}>
                <Typography variant="paragraph">
                  <strong>Contact</strong>
                </Typography>
                <br />
                <Typography variant="paragraph" className={success.para}>
                  +91 9596537421
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          item
          container
          style={{
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
          }}
        >
          <Typography variant="paragraph">
            <strong>Total</strong>
          </Typography>
          <Typography variant="paragraph">
            <strong>$1024</strong>
          </Typography>
        </Grid>
      </Grid>
    </section>
  );
};

export default Confirmation;
