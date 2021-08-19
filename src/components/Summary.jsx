import { Grid } from "@material-ui/core";
import styles from "../styles/Summary.module.css";
const Summary = ({ total, handler, title, subTotal, country, setCountry }) => {
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
  const NGN = ["Nigeria"];
  return (
    <div className={styles.card}>
      <h4>Booking Summary</h4>
      <div>
        <p>
          <span>{title}</span> <span>$ {total}</span>
        </p>
        <p className={styles.total}>
          <span>Sub Total</span> <span>${subTotal} </span>
        </p>
        <select
          name="currency"
          id="currency"
          onChange={(e) => {
            console.log("HELOOOOOOOOOO", e.target.value);
            setCountry(e.target.value);
          }}
        >
          {NGN.includes(country) ? (
            <option value="Nigeria" selected>
              NGN &#8358;
            </option>
          ) : (
            <option value="Nigeria">NGN &#8358; </option>
          )}
          {Euro.includes(country) ? (
            <option value="Azores" selected>
              EUR &euro;
            </option>
          ) : (
            <option value="Azores">EUR &euro;</option>
          )}
          {GBP.includes(country) ? (
            <option value="United Kingdom" selected>
              GBP &#163;
            </option>
          ) : (
            <option value="United Kingdom">GBP &#163;</option>
          )}
          {country ? (
            <option value="USD" selected>
              USD $
            </option>
          ) : (
            <option value="USD">USD $</option>
          )}
        </select>
      </div>
    </div>
  );
};
export default Summary;
