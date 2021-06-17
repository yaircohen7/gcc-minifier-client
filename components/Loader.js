import React, { useState } from "react";
import styles from "./Loader.module.css";
const Loader = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.ldHhourglass}></div>
        </div>
    )
};

export default Loader;