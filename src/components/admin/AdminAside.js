import { useState } from "react";
import {
  Home,
  Flight,
  LocalShipping,
  Money,
  TransferWithinAStation,
  AirportShuttle,
  PersonAdd,
  LocationCity,
} from "@material-ui/icons";

import styles from "../../styles/Dashboard.module.css";

const colorWhite = {
  color: "#000",
};
const AdminAside = ({ onStateChange }) => {
  let [link, setLink] = useState("Overview");
  return (
    <aside className={styles.aside}>
      <div
        onClick={() => {
          onStateChange("Overview");
          setLink("Overview");
        }}
        className={styles.links}
        style={{
          background: link == "Overview" ? "#ECF0F5" : "",
          color: link == "Overview" ? "#000" : "",
        }}
      >
        <Home fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Dashboard</h4>
      </div>
      <div
        className={styles.links}
        style={{
          background: link == "Airport" ? "#ECF0F5" : "",
          color: link == "Airport" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("Airport");
          setLink("Airport");
        }}
      >
        <Flight fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Airport Transfer</h4>
      </div>
      <div
        className={styles.links}
        style={{
          background: link == "Car" ? "#ECF0F5" : "",
          color: link == "Car" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("Car");
          setLink("Car");
        }}
      >
        <LocalShipping fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Car Hire</h4>
      </div>
      <div
        className={styles.links}
        style={{
          background: link == "Fleet" ? "#ECF0F5" : "",
          color: link == "Fleet" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("Fleet");
          setLink("Fleet");
        }}
      >
        <AirportShuttle fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Fleet Management</h4>
      </div>
      <div
        onClick={() => {
          onStateChange("Priority");
          setLink("Priority");
        }}
        className={styles.links}
        style={{
          background: link == "Priority" ? "#ECF0F5" : "",
          color: link == "Priority" ? "#000" : "",
        }}
      >
        <TransferWithinAStation fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Priority Pass</h4>
      </div>
      <div
        className={styles.links}
        className={styles.links}
        style={{
          background: link == "Hotel" ? "#ECF0F5" : "",
          color: link == "Hotel" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("Hotel");
          setLink("Hotel");
        }}
      >
        <LocationCity fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Hotel Transfer</h4>
      </div>
      <div
        className={styles.links}
        style={{
          background: link == "User" ? "#ECF0F5" : "",
          color: link == "User" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("User");
          setLink("User");
        }}
      >
        <PersonAdd fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>User Management</h4>
      </div>
      <div
        className={styles.links}
        style={{
          background: link == "Rates" ? "#ECF0F5" : "",
          color: link == "Rates" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("Rates");
          setLink("Rates");
        }}
      >
        <Money fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Exchange Rates</h4>
      </div>
      <div
        className={styles.links}
        style={{
          background: link == "Hire" ? "#ECF0F5" : "",
          color: link == "Hire" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("Hire");
          setLink("Hire");
        }}
      >
        <Money fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Manage Cars</h4>
      </div>
      <div
        className={styles.links}
        style={{
          background: link == "Vehicles" ? "#ECF0F5" : "",
          color: link == "Vehicles" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("Vehicles");
          setLink("Vehicles");
        }}
      >
        <Money fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Vehicles</h4>
      </div>
      <div
        className={styles.links}
        style={{
          background: link == "Cabin" ? "#ECF0F5" : "",
          color: link == "Cabin" ? "#000" : "",
        }}
        onClick={() => {
          onStateChange("Cabin");
          setLink("Cabin");
        }}
      >
        <Money fontSize="small" style={colorWhite} />
        <h4 className={styles.asideHeading}>Cabin Classes</h4>
      </div>
    </aside>
  );
};

export default AdminAside;
