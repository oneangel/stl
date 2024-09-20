"use client";
import { useState } from "react";
import styles from "./style.module.scss";
import Titles from "./titles";
import Descriptions from "./descriptions";

const data = [
  {
    title: "IoT",
    description: "Sensores conectados para gestionar el tráfico inteligente",
    speed: 0.5,
  },
  {
    title: "Sostenibilidad",
    description: "Reduce las emisiones al minimizar los atascos de tráfico.",
    speed: 0.67,
  },
  {
    title: "AI",
    description: "Optimización automática del flujo vehicular.",
    speed: 0.5,
  },

  {
    title: "Innovación",
    description:
      "Integra IA para transformar las ciudades con movilidad inteligente.",
    speed: 0.8,
  },
  {
    title: "OTA",
    description: "Actualización remota de semáforos sin interrupciones.",
    speed: 0.8,
  },
  {
    title: "Flexibilidad",
    description:
      "Se adapta a las condiciones del tráfico para un mejor rendimiento.",
    speed: 0.8,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className={styles.container}>
      <Titles data={data} setSelectedProject={setSelectedProject} />
      <Descriptions data={data} selectedProject={selectedProject} />
    </div>
  );
}
