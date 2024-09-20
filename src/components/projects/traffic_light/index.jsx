import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function TrafficLight() {
  const [activeLight, setActiveLight] = useState(null);

  const handleClick = (color) => {
    setActiveLight(activeLight === color ? null : color);
  };

  return (
    <div className={styles.trafficLightWrapper}>
      <div className={styles.trafficLight}>
        {/* Luz Roja */}
        <motion.div
          onClick={() => handleClick("red")}
          className={`${styles.light} ${
            activeLight === "red" ? styles.redActive : styles.red
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        ></motion.div>

        {/* Luz Amarilla */}
        <motion.div
          onClick={() => handleClick("yellow")}
          className={`${styles.light} ${
            activeLight === "yellow" ? styles.yellowActive : styles.yellow
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        ></motion.div>

        {/* Luz Verde */}
        <motion.div
          onClick={() => handleClick("green")}
          className={`${styles.light} ${
            activeLight === "green" ? styles.greenActive : styles.green
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        ></motion.div>
      </div>

      {/* Etiquetas a la derecha del semáforo */}
      <div className={styles.labels}>
        {activeLight === "red" && <p className={styles.activeLabel}>ALTO</p>}
        {activeLight === "yellow" && <p className={styles.activeLabel}>PRECAUCION</p>}
        {activeLight === "green" && <p className={styles.activeLabel}>AVANCE</p>}
      </div>
    </div>
  );
}
