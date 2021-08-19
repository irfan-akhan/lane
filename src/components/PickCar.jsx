import { Card, Grid, Typography } from "@material-ui/core";
import { Person, Work } from "@material-ui/icons";
import { useEffect, useState } from "react";
import pick from "../styles/Pick.module.css";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NGN = ["Nigeria"];
const Euro = [
  "Azores",
  "the Canaries",
  "Ceuta and Melilla",
  "French Guiana",
  "Guadeloupe",
  "Madeira",
  "Martinique",
  " Mayotte",
  "Réunion",
  "Saint Barthélemy",
  "Saint Pierre and Miquelon",
];
const GBP = ["United Kingdom"];
const PickCar = ({ car, handler, country }) => {
  const [currency, setCurrency] = useState("USD");

  console.log("COUNTRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY", country);
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    NGN.includes(country)
      ? setCurrency("NGN")
      : Euro.includes(country)
      ? setCurrency("EURO")
      : GBP.includes(country)
      ? setCurrency("POUND")
      : "";
    fetch("https://shuttlelaneee.herokuapp.com/api/vehicles", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("response from server", result);
        setVehicles(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [country]);
  return (
    <div style={{ marginBottom: "1rem" }} className={pick.component}>
      <div
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #212121",
          padding: ".5rem 1.5rem",
        }}
      >
        <h4
          style={{
            margin: "0",
            padding: "0",

            textTransform: "uppercase",
          }}
        >
          Pick Your Car
        </h4>
      </div>

      {/* Economy  */}

      {vehicles?.map((vehicle) => {
        return (
          <Card className={pick.carCard} key={vehicle.name}>
            <div className={pick.image}>
              <img src={`${prefix}/assets/images/${vehicle.name}.png`} alt="" />
            </div>
            <div className={pick.description}>
              <Typography variant="h6">{vehicle.name}</Typography>
              <div className={pick.details}>
                <span
                  style={{
                    marginRight: ".4rem",
                  }}
                >
                  <Person fontSize="small" />
                  {vehicle?.capacity}
                </span>
                <span>
                  <Work fontSize="small" />
                  {vehicle?.luggage}
                </span>
              </div>
              <Typography variant="body1" style={{ opacity: ".7" }}>
                {vehicle?.cars.map((car) => car + " ")}
              </Typography>
            </div>
            <div className={pick.buttons}>
              <Typography variant="subtitle1" style={{ fontWeight: "bolder" }}>
                {currency.includes("POUND")
                  ? "€ "
                  : currency.includes("EURO")
                  ? "£ "
                  : "$ "}
                {parseInt(vehicle.rate)}
              </Typography>
              <button
                value={vehicle.name}
                onClick={handler}
                className="btnNotSelected"
                style={{
                  backgroundColor: car === vehicle.name ? "orange" : "",
                }}
              >
                Select
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
export default PickCar;
