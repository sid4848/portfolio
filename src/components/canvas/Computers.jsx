import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile, isLaptop }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile || isLaptop ? 0.6 : 0.76}
        position={isMobile ? [0, -3.31, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery_1 = window.matchMedia("(max-width: 500px)");
    const mediaQuery_2 = window.matchMedia("(max-width: 1024px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery_1.matches);
    setIsLaptop(mediaQuery_2.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event_1, event_2) => {
      setIsMobile(event_1.matches);
      setIsLaptop(event_2.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery_1.addEventListener("change", handleMediaQueryChange);
    mediaQuery_2.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery_1.removeEventListener("change", handleMediaQueryChange);
      mediaQuery_2.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} isLaptop={isLaptop} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
