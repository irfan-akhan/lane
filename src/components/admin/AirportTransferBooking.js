import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";

import styles from "../../styles/Dashboard.module.css";
import AirportBookingForm from "./AirportBookingForm";
import Modal from "./Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AirportTransferBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [reload, setReload] = useState(false);
  const statusModalRef = useRef(null);
  useEffect(() => {
    fetch("https://shuttlelaneee.herokuapp.com/api/booking/airport")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.data);
      })
      .catch((err) => console.log(err));
  }, [reload]);
  const statusModalToggler = (e) => {
    if (statusModalRef.current.style.display != "none") {
      statusModalRef.current.style.display = "none";
    } else {
      statusModalRef.current.style.display = "block";
    }
  };
  const [editMode, setEditMode] = useState(false);
  const onClickHandler = () => {
    setEditMode(true);
  };

  const updateStatus = (e) => {
    console.log(e.target.innerText);
    toast.info(`Please Wait, update in progress`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    let status = e.target.innerText.trim();
    let id = selectedItem._id;
    console.log(selectedItem.bookingReference);
    const data = { serviceStatus: status };
    fetch(`https://shuttlelaneee.herokuapp.com/api/booking/airport/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          toast.success(result.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        }
        statusModalToggler();
        setReload(!reload);
      })
      .catch((err) => {
        console.log("update Catch", err);
        toast.error("err", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };

  return (
    <>
      {editMode && (
        <Modal
          isOpen={editMode}
          onCloseHandler={() => {
            setEditMode(false);
          }}
        >
          <AirportBookingForm />
        </Modal>
      )}

      <Grid item xs={12}>
        <main
          style={{
            width: "98%",
          }}
        >
          <div
            ref={statusModalRef}
            className={styles.statusModal}
            style={{ display: "none" }}
          >
            <h3>update status </h3>
            <h2 onClick={statusModalToggler}>&times;</h2>
            <div>
              <button
                className={styles.button}
                style={{ padding: "12px", margin: "5px" }}
                onClick={updateStatus}
              >
                Pending
              </button>

              <button
                className={styles.button}
                style={{
                  padding: "12px",
                  margin: "5px",
                  backgroundColor: "teal",
                }}
                onClick={updateStatus}
              >
                Approved
              </button>
              <button
                className={styles.button}
                style={{
                  padding: "12px",
                  margin: "5px",
                  backgroundColor: "red",
                }}
                onClick={updateStatus}
              >
                Cancelled
              </button>
              <button
                className={styles.button}
                style={{
                  padding: "12px",
                  margin: "5px",
                  backgroundColor: "green",
                }}
                onClick={updateStatus}
              >
                Completed
              </button>
              <button
                className={styles.button}
                style={{
                  padding: "12px",
                  margin: "5px",
                  backgroundColor: "orange",
                }}
                onClick={updateStatus}
              >
                Scheduled
              </button>
            </div>
          </div>

          <ToastContainer />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <h3>Airport Bookings</h3>
            <button className={styles.button} onClick={onClickHandler}>
              Add Booking
            </button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.theading}>
                <th>#</th>
                <th>Booking reference</th>
                <th>Details</th>

                <th>Date & Time</th>
                <th>Contact</th>
                <th>Amount</th>
                <th>Payment </th>
                <th>Booking Date</th>
                <th>Service </th>
              </tr>
            </thead>
            <tbody className={styles.tableContent}>
              {bookings?.map((item, idx) => {
                return (
                  <tr key={item.bookingReference}>
                    <td
                      style={{
                        marginRight: "15px",
                        paddingLeft: "5px",
                        display: "inline-block",
                      }}
                    >
                      {++idx}
                    </td>
                    <td>{item.bookingReference}</td>
                    <td>
                      <p>
                        <strong>Transfer Type:</strong>{" "}
                        <u
                          style={{
                            fontStyle: "italic",
                            color: "#4D96FF",
                          }}
                        >
                          {" "}
                          {item.formType}
                        </u>
                      </p>

                      <p
                        style={{
                          width: "80%",
                          height: "fit-content",
                        }}
                      >
                        <strong>Airport:</strong>
                        {item?.pickupAirport || item?.dropoffAirport}
                      </p>
                      <p>
                        <strong>Flight Number:</strong>{" "}
                        {item.flightNumber || " "}
                      </p>

                      <p>
                        <strong>Address:</strong>{" "}
                        {item.dropoffAddress || item.pickupAddress}
                      </p>
                      <p>
                        <strong>Vehicle Class:</strong> {item.carType}
                      </p>

                      <p>
                        <strong>Passengers:</strong> {item.passengers}
                      </p>
                    </td>

                    <td>
                      {item.arrivalDate?.slice(0, 10) ||
                        item.pickupDate?.slice(0, 10)}{" "}
                      <br /> & {item.time}
                    </td>
                    <td>
                      <p>
                        <span style={{ marginRight: "3px" }}>{item.title}</span>{" "}
                        <span style={{ marginRight: "3px" }}>
                          {item.firstName}
                        </span>
                        <span style={{ marginRight: "3px" }}>
                          {item.lastName}
                        </span>
                      </p>
                      <p>{item.email}</p>
                      <p>
                        <span>+{item.countryCode}</span>{" "}
                        <span>{item.mobile}</span>{" "}
                      </p>
                    </td>
                    <td>
                      NGN <br />
                      {item.amount}
                    </td>
                    <td>{item.paymentStatus}</td>
                    <td>
                      {item.createdAt.slice(0, 10)} <br />
                    </td>
                    <td>
                      {item.serviceStatusL} <br /> <br />
                      <button
                        className={styles.button}
                        style={{ padding: "8px" }}
                        onClick={(e) => {
                          setSelectedItem(item);
                          statusModalToggler(e);
                        }}
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </Grid>
    </>
  );
};

export default AirportTransferBooking;
