"use client"; // Asegúrate de colocar esta línea al inicio del archivo

import styles from "./page.module.scss";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/smoothScroll";
import Projects from "@/components/projects";
import { SparklesPreview } from "@/components/ui/sparklesPreview";
import Lighter from "../components/lights";

import TrafficLight from "../components/projects/traffic_light";
import TrafficImages from "../components/projects/traffic_image";

import UrgeWithPleasureComponent from "../components/countdown";

const Earth = dynamic(() => import("@/components/earth"), {
  ssr: false,
  loading: () => <img src="/assets/placeholder.png" alt="placeholder" />,
});

const Semaforo = () => (
  <>
    <div className="mt-8">
      <UrgeWithPleasureComponent />
    </div>

    <div>
    <TrafficLight />
    </div>

    <div>
    <TrafficImages />
    </div>
  </>
);


export default function Home() {
  const [showLights, setShowLights] = useState(false);

  return (
    <>
      <SmoothScroll>
        <SparklesPreview />
        <main className={styles.main}>
          {!showLights ? (
            <>
              <Earth />
              <Projects />
            </>
          ) : (
            <Semaforo />
          )}
        </main>
        <div className="mt-8">
          <button
            className="px-4 py-2 bg-accent text-background font-bold rounded text-white"
            onClick={() => setShowLights(true)}
          >
            Go to Default Page
          </button>
        </div>
      </SmoothScroll>
    </>
  );
}
