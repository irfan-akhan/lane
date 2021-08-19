import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import Modal from "./Modal";
import CarBookingForm from "./CarBookingForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Dashboard.module.css";

const CarBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [reload, setReload] = useState(false);
  const statusModalRef = useRef(null);
  useEffect(() => {
    fetch("https://shuttlelaneee.herokuapp.com/api/booking/car")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, [reload]);
  const [editMode, setEditMode] = useState(false);
  const onClickHandler = () => {
    setEditMode(true);
  };
  const statusModalToggler = (e) => {
    if (statusModalRef.current.style.display != "none") {
      statusModalRef.current.style.display = "none";
    } else {
      statusModalRef.current.style.display = "block";
    }
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
    fetch(`https://shuttlelaneee.herokuapp.com/api/booking/car/${id}`, {
      method: "PUT",
      headers: {
        // wan ya illl call you back
        Accept: "application/json",
        "Content-Type": "application/json",
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
        toast.error(err, {
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
          <CarBookingForm />
        </Modal>
      )}
      <Grid item xs={12}>
        <main style={{ width: "98%" }}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <h3>Existing Bookings</h3>
            <button className={styles.button} onClick={onClickHandler}>
              Add Booking
            </button>
          </div>
          <ToastContainer />
          <table className={styles.table}>
            <thead style={{ backgroundColor: "red" }}>
              <tr className={styles.theading}>
                <th>#</th>
                <th>Booking reference</th>
                <th style={{ marginLeft: "-15px" }}>Details</th>
                <th>Date & Time</th>
                <th>Contact</th>
                <th>Amount</th>
                <th>Booking Date</th>
                <th>Service Status</th>
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
                      <p>Pickup: {item?.pickupAddress}</p>
                      <p>Vehicle : {item?.carType}</p>

                      <p>Days: {item?.days}</p>

                      <p>Destination: {item?.destination}</p>
                    </td>

                    <td>
                      {item?.date?.slice(0, 10)} <br /> & {item.time}
                    </td>
                    <td>
                      <p>
                        <span style={{ marginRight: "3px" }}>
                          {item?.title}
                        </span>
                        <span style={{ marginRight: "3px" }}>
                          {item?.firstName}
                        </span>
                        <span style={{ marginRight: "3px" }}>
                          {item?.lastName}
                        </span>
                      </p>
                      <p>{item?.email}</p>
                      <p>
                        <span>{item?.countryCode}</span>
                        <span>{item?.mobile}</span>
                      </p>
                    </td>
                    <td>
                      NGN <br />
                      {item.amount}
                    </td>

                    <td>
                      {item.createdAt.slice(0, 10)} <br />
                    </td>
                    <td>
                      {item.serviceStatus} <br /> <br />
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

export default CarBooking;
