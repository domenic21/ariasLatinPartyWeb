/* ============================================================
   ModelViewer  (generic, reusable 3D model component)
   ------------------------------------------------------------
   Loads ANY .gltf model and displays it auto-framed, lit, and
   slowly auto-rotating. Used for the KRK speaker (and reusable
   for future models). Runs only in the browser (mount with
   client:only="react") because Three.js needs WebGL.

   Props:
     src              - path to the .gltf (under /public)
     cameraPosition   - [x,y,z] camera placement (zoom)
     fov              - camera field of view (lower = more zoomed)
     autoRotateSpeed  - spin speed
     boundsMargin     - framing tightness (smaller = more zoomed in)

   ------------------------------------------------------------
   Attribution for any model used here is required (CC BY 4.0)
   and is rendered in the site footer (see Footer.astro).
   ============================================================ */

import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Bounds,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";

function Model({ src, hideMaterials = [], oscillate = false, oscillateAmount = 0.22, oscillateSpeed = 1.1 }) {
  const { scene } = useGLTF(src);
  const groupRef = useRef();

  // OSCILLATION: instead of spinning all the way around, gently tilt the
  // model up and down on its X axis (a "nod") so the FRONT always stays
  // facing the camera, then reverse — looping forever. Driven by a sine
  // wave so it eases smoothly at the top and bottom of the motion.
  useFrame((state) => {
    if (oscillate && groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.x = Math.sin(t * oscillateSpeed) * oscillateAmount;
    }
  });

  // Optionally strip out meshes by their material name (e.g. the speaker
  // STAND uses material "Noir_tube"). We clone the scene first so we don't
  // mutate the cached original, then REMOVE the matching meshes — removing
  // (not just hiding) is what makes <Bounds> re-frame on the speaker only.
  const prepared = useMemo(() => {
    const clone = scene.clone(true);
    if (hideMaterials.length) {
      const toRemove = [];
      clone.traverse((obj) => {
        if (
          obj.isMesh &&
          obj.material?.name &&
          hideMaterials.some((m) => obj.material.name.includes(m))
        ) {
          toRemove.push(obj);
        }
      });
      toRemove.forEach((mesh) => mesh.removeFromParent());
    }
    return clone;
  }, [scene, hideMaterials]);

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={prepared} />
      </group>
    </Center>
  );
}

export default function ModelViewer({
  src,
  cameraPosition = [0, 0.5, 4],
  fov = 40,
  autoRotateSpeed = 1.2,
  boundsMargin = 1,
  hideMaterials = [],
  oscillate = false,
}) {
  // Preload kicks off the download as soon as the component mounts.
  useGLTF.preload(src);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: cameraPosition, fov }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ff7ce5" />
      <directionalLight position={[-5, 2, -3]} intensity={1.5} color="#6ea8ff" />

      <Suspense fallback={null}>
        {/* observe is OFF when oscillating so the auto-frame doesn't
            re-zoom every frame as the speaker tilts (avoids pulsing). */}
        <Bounds fit clip observe={!oscillate} margin={boundsMargin}>
          <Model src={src} hideMaterials={hideMaterials} oscillate={oscillate} />
        </Bounds>
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.5}
          scale={12}
          blur={2.5}
          far={4}
        />
      </Suspense>

      {/* When oscillating we DON'T auto-rotate (no full spin) — the
          up/down nod above handles the motion instead. */}
      <OrbitControls
        autoRotate={!oscillate}
        autoRotateSpeed={autoRotateSpeed}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
