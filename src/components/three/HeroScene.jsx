/* ============================================================
   3D HERO SCENE  (React Three Fiber + Three.js)
   ------------------------------------------------------------
   Loads and displays the Pioneer DJ console 3D model behind the
   hero text. Runs only in the browser (mounted in Hero.astro
   with client:only="react") because Three.js needs WebGL.

   ------------------------------------------------------------
   3D MODEL ATTRIBUTION (required by license — DO NOT REMOVE)
   "Pioneer DJ console" (https://skfb.ly/pxHQG)
   by TwoPixels Studio
   Licensed under Creative Commons Attribution (CC BY 4.0)
   http://creativecommons.org/licenses/by/4.0/
   The full license is also kept at:
   public/models/pioneer_dj_console/license.txt
   A visible credit is shown in the site footer (see Footer.astro).
   ------------------------------------------------------------
   Model files live in: public/models/pioneer_dj_console/scene.gltf
   ============================================================ */

import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Center,
  Bounds,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useRef } from "react";

// Path is relative to /public, so it resolves at the site root.
const MODEL_PATH = "/models/pioneer_dj_console/scene.gltf";

// --- The DJ console model ---
function Console() {
  // useGLTF loads the .gltf (+ its .bin and textures) and caches it.
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef();

  // ZOOM PULSE (inside -> out): smoothly scale the console from small
  // (zoomed IN, "inside") outward to large, then back — looping forever.
  // It STARTS at the small end because of the -PI/2 phase shift.
  // Tweak to taste:
  //   MIN_SCALE / MAX_SCALE -> how far in/out it zooms
  //   SPEED                 -> how fast it breathes
  const MIN_SCALE = 0.8;
  const MAX_SCALE = 1.15;
  const SPEED = 0.7;
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      // sin(...- PI/2) goes -1 -> 1, so we begin at MIN_SCALE (inside).
      const wave = (Math.sin(t * SPEED - Math.PI / 2) + 1) / 2; // 0 -> 1
      const s = MIN_SCALE + wave * (MAX_SCALE - MIN_SCALE);
      groupRef.current.scale.set(s, s, s);
    }
  });

  // <Center> recenters the model on the origin so it zooms FROM the center.
  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

// Preload the model so it starts downloading immediately (smoother first paint).
useGLTF.preload(MODEL_PATH);

// --- The canvas (the "stage" the model lives on) ---
export default function HeroScene() {
  return (
    // Camera placed UP and to the SIDE (diagonal 3/4 view) so the top
    // deck surface AND the side are both visible. Bounds keeps this
    // viewing angle and just zooms to fit.
    <Canvas
      dpr={[1, 2]} // cap pixel ratio for performance
      camera={{ position: [3.5, 3, 5], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lights — give the metallic surfaces something to reflect */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ff7ce5" />
      <directionalLight position={[-5, 2, -3]} intensity={1.5} color="#6ea8ff" />

      {/* Suspense shows nothing while the (large) model downloads */}
      <Suspense fallback={null}>
        {/* Bounds frames the model once on load. observe is OFF so it
            does NOT keep re-framing as the zoom pulse changes the size
            (otherwise the camera would cancel out the zoom effect). */}
        <Bounds fit clip margin={0.9}>
          <Console />
        </Bounds>

        {/* Environment adds soft realistic reflections to the metal/plastic.
            preset="city" is bundled by drei (no external download needed). */}
        <Environment preset="city" />

        {/* Soft shadow under the console to ground it */}
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.5}
          scale={12}
          blur={2.5}
          far={4}
        />
      </Suspense>

      {/* No OrbitControls: the console no longer spins or is draggable —
          the looping zoom pulse (in Console above) is its only motion. */}
    </Canvas>
  );
}
