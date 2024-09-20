"use client"; // Asegúrate de colocar esta línea al inicio del archivo

import styles from "./page.module.scss";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/smoothScroll";
import Projects from "@/components/projects";
import { SparklesPreview } from "@/components/ui/sparklesPreview";
import Lighter from "../components/lights";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

import TrafficLight from "../components/projects/traffic_light";
import TrafficImages from "../components/projects/traffic_image";

import UrgeWithPleasureComponent from "../components/countdown";

const Earth = dynamic(() => import("@/components/earth"), {
  ssr: false,
  loading: () => <img src="/assets/placeholder.png" alt="placeholder" />,
});

const Semaforo = () => (
  <div className="flex flex-wrap items-center justify-center w-screen">
    <div className="mt-8">
      <UrgeWithPleasureComponent />
    </div>

    <div>
      <TrafficLight />
    </div>

    <div className="w-[800px]">
      <TrafficImages />
    </div>
  </div>
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

        <div className="flex justify-center m-40 text-2xl text-center">
          <HoverBorderGradient
            onClick={() => setShowLights(true)}
            containerClassName="rounded-full"
            as="button"
            className="flex items-center space-x-2 text-black bg-white dark:bg-black dark:text-white"
          >
            <span>Aceternity UI</span>
          </HoverBorderGradient>
        </div>
      </SmoothScroll>
    </>
  );
}
