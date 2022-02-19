import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import SignupHeader from "../components/signupHeader";
import styles from "../styles/Signup.module.css";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const router = useRouter();

  const [isPhone, setIsPhone] = useState(false);
  const validate = (values: any) => {
    const errors: any = {};
    if (isPhone) {
      if (!values.phone) {
        errors.phone = "Required";
      } else if (!/^[0-9]{7,10}$/i.test(values.phone)) {
        errors.phone = "Invalid phone number";
      }
    } else {
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
    },
    validate,
    onSubmit: (values) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("verificationMethod", isPhone ? "phone" : "email");
        localStorage.setItem("phoneVerification", values.phone);
        localStorage.setItem("emailVerification", values.email);
      }
      router.push("/verification");
    },
  });
  return (
    <div>
      <SignupHeader>
        <img src="logo.PNG" className={styles.icon}></img>
        <b className={styles.HeaderText}>
          <span className={styles.HeaderColorText}> Home</span>Page
        </b>
      </SignupHeader>
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
                error={formik.errors.email ? true : false}
                helperText={formik.errors.email ? formik.errors.email : ""}
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
                error={formik.errors.phone ? true : false}
                helperText={formik.errors.phone ? formik.errors.phone : ""}
              ></TextField>
            )}
          </div>
          <div className={styles.mainContainer}>
            <Button
              sx={{
                backgroundColor:
                  (!formik.errors.phone &&
                    isPhone &&
                    formik.values.phone != "") ||
                  (!formik.errors.email &&
                    !isPhone &&
                    formik.values.email != "")
                    ? "#885fff"
                    : "#BEBEC2",
                "border-radius": "10px",
              }}
              variant="contained"
              type="submit"
            >
              Continue
            </Button>
          </div>
          <div className={styles.conditionsText}>
            <p>
              by clicking continue you must agree to near labs
              <br />
              <a className={styles.linkText}>Terms & Conditions</a> and{" "}
              <a className={styles.linkText}>Privacy Policy</a>
            </p>
          </div>
          <hr className={styles.line} />
          <div className={styles.nearText}>Already have NEAR account?</div>
          <div className={styles.nearButton}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#414047", "border-radius": "10px" }}
            >
              Log in with NEAR
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Signup;
