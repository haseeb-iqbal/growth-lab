import React, { FC } from "react";
import styles from "../styles/SignupHeader.module.css";
const SignupHeader: FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default SignupHeader;
