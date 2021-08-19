import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Admin.module.css";
import dashboard from "../../styles/Dashboard.module.css";

const UpdateUserForm = ({ user, setAction }) => {
  const [inputValues, setInputValues] = useState(
    user
      ? { email: user.email, name: user.name, password: "", role: user.role }
      : {}
  );
  const onChangeHandler = (e) => {
    e.persist();
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateHandler = (e) => {
    e.preventDefault();
    toast.info(`Please Wait`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    try {
      fetch(`https://shuttlelaneee.herokuapp.com/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.data) {
            toast.success(` user ${result.data.name} Updated`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
            setAction((prevState) => !prevState);
          }
        });
    } catch (error) {
      toast.error(` ${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <form
      className={styles.signUp}
      onSubmit={onUpdateHandler}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1 className={styles.heading}>Update User</h1>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        required
        onChange={onChangeHandler}
        value={inputValues?.name || " "}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        required
        onChange={onChangeHandler}
        value={inputValues?.email || " "}
      />
      <select
        id="role"
        name="role"
        value={inputValues?.role || " "}
        onChange={onChangeHandler}
        placeholder="Select a person"
      >
        <option value="blogger">Blogger</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        required
        onChange={onChangeHandler}
        value={inputValues.password}
      />
      <button
        onClick={() => {
          toast();
        }}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
export default UpdateUserForm;
