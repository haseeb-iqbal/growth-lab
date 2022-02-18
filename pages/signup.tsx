import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import SignupHeader from "../components/signupHeader";
import styles from "../styles/Signup.module.css";
import { useFormik } from "formik";
import { useState } from "react";

const Signup: NextPage = () => {
  const [isPhone, setIsPhone] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <SignupHeader>HomePage</SignupHeader>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.container}>
          <div className={styles.switchContainer}>
            <Button
              variant={isPhone ? "text" : "outlined"}
              className={styles.switchButton}
              onClick={() => setIsPhone(false)}
            >
              Email
            </Button>
            <Button
              variant={isPhone ? "outlined" : "text"}
              className={styles.switchButton}
              onClick={() => setIsPhone(true)}
            >
              Phone
            </Button>
          </div>
          <div className={styles.mainContainer}>
            {!isPhone && (
              <TextField
                className={styles.numberInput}
                placeholder="johndoe@gmail.com"
                variant="outlined"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              ></TextField>
            )}
            {isPhone && (
              <TextField
                className={styles.numberInput}
                placeholder="Ex (337) 378 8383"
                variant="outlined"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              ></TextField>
            )}
          </div>
          <div className={styles.mainContainer}>
            <Button
              className={styles.numberInput}
              variant="outlined"
              type="submit"
            >
              Continue
            </Button>
          </div>
          <div className={styles.conditionsText}>
            <p>
              by clicking continue you must agree to near labs
              <br />
              <a>Terms & Conditions</a> and <a>Privacy Policy</a>
            </p>
          </div>
          <hr className={styles.line} />
          <div className={styles.nearText}>Already have NEAR account?</div>
          <div className={styles.nearButton}>
            <Button variant="contained">Log in with NEAR</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
