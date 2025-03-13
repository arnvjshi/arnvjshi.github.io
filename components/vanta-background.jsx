import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    console.log("VantaBackground useEffect running...");

    const loadVanta = async () => {
      try {
        if (typeof window !== "undefined") {
          const THREE = await import("three");
          const VANTA = await import("vanta/dist/vanta.waves.min.js");

          console.log("Vanta and Three.js loaded successfully!");

          const effect = VANTA.default({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight,
            minWidth: window.innerWidth,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x10101,
            shininess: 105.0,
            waveHeight: 31.0,
            waveSpeed: 1.05,
            zoom: 0.82,
            THREE,
          });

          setVantaEffect(effect);
          console.log("Vanta effect initialized!");
        }
      } catch (error) {
        console.error("Failed to load Vanta.js:", error);
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) {
        console.log("Destroying Vanta effect...");
        vantaEffect.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="vanta-container" />;
};

export default dynamic(() => Promise.resolve(VantaBackground), { ssr: false });
