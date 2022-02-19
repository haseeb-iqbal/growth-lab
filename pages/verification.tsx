import type { NextPage } from "next";
import SignupHeader from "../components/signupHeader";
import styles from "../styles/Verification.module.css";
import { useFormik } from "formik";
import ReactCodeInput from "react-verification-code-input";
import { Button } from "@mui/material";
import { useState } from "react";

const Verification: NextPage = () => {
  const [isInputComplete, setInputComplete] = useState(false);

  var isPhone: boolean = false;
  var verificationValue: string | null = "";
  if (typeof window !== "undefined") {
    isPhone = localStorage.getItem("verificationMethod") == "phone";
    if (isPhone) {
      verificationValue = localStorage.getItem("phoneVerification");
    } else {
      verificationValue = localStorage.getItem("emailVerification");
    }
  }

  const validate = (values: any) => {
    const errors: any = {};
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <SignupHeader>
        <b>Verification</b>
      </SignupHeader>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.container}>
          {isPhone && (
            <p className={styles.verificationText}>
              We've sent a 6 digit verification code to your phone
            </p>
          )}
          {!isPhone && (
            <p className={styles.verificationText}>
              We've sent a 6 digit verification code to the email address
            </p>
          )}

          <p className={styles.verificationValueText}>{verificationValue}</p>

          <p className={styles.EnterCodeText}>Enter Verification Code</p>
          <div className={styles.inputRectangleContainer}>
            <ReactCodeInput onComplete={() => setInputComplete(true)} />
          </div>

          <Button
            variant="contained"
            className={styles.button}
            sx={{
              backgroundColor: isInputComplete ? "#885fff" : "#BEBEC2",
              margin: "20px",
            }}
          >
            Continue
          </Button>
          <hr className={styles.line} />
          <p>Didn't recieve your code?</p>
          <p className={styles.linkText}>Send to a different email address</p>
          <p className={styles.linkText}>resend your code</p>
        </div>
      </form>
    </div>
  );
};

export default Verification;
