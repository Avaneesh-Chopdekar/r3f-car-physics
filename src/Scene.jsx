/* eslint-disable no-unused-vars */
import { Suspense, useEffect, useState } from "react";
import MyLoader from "./components/MyLoader";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import Track from "./Track";
import Ground from "./Ground";
import Car from "./Car";

export default function Scene() {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keyDownHandler(e) {
      if (e.key === "k") {
        // random is necessary for state change
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={<MyLoader />}>
      <Environment files="/textures/envmap.hdr" background="both" />
      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      {thirdPerson || <OrbitControls target={[-2.64, -0.71, 0.03]} />}
      <Track />
      <Ground />
      <Car thirdPerson={thirdPerson} />
    </Suspense>
  );
}
