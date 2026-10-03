import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
function CircuitTrace({
  start,
  end,
  width = 0.025
}) {
  const dx = end[0] - start[0];
  const dz = end[1] - start[1];
  return <mesh position={[(start[0] + end[0]) / 2, 0.065, (start[1] + end[1]) / 2]} rotation={[0, Math.atan2(-dz, dx), 0]}>
      <boxGeometry args={[Math.hypot(dx, dz), 0.008, width]} />
      <meshStandardMaterial color="#58b9a5" metalness={0.65} roughness={0.3} emissive="#0c443e" emissiveIntensity={0.35} />
    </mesh>;
}
function LidarModule() {
  const module = useRef(null);
  const scan = useRef(null);
  const [target, setTarget] = useState({
    x: 0,
    y: 0
  });
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);
  useFrame((state, delta) => {
    if (!reducedMotion && module.current) {
      module.current.rotation.y += delta * 0.11;
      module.current.rotation.x = MathUtils.damp(module.current.rotation.x, target.y * 0.09, 3, delta);
      module.current.rotation.z = MathUtils.damp(module.current.rotation.z, -target.x * 0.09, 3, delta);
      module.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.055;
    }
    if (!reducedMotion && scan.current) scan.current.rotation.y += delta * 0.75;
  });
  return <Float speed={0.9} rotationIntensity={reducedMotion ? 0 : 0.025} floatIntensity={reducedMotion ? 0 : 0.08}>
      <group ref={module} scale={0.85} onPointerMove={event => setTarget({
      x: event.pointer.x,
      y: event.pointer.y
    })} onPointerOut={() => setTarget({
      x: 0,
      y: 0
    })}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.55, 0.12, 1.78]} />
          <meshStandardMaterial color="#123a34" metalness={0.42} roughness={0.58} />
        </mesh>
        <mesh position={[0, 0.064, 0]}>
          <boxGeometry args={[2.39, 0.012, 1.62]} />
          <meshStandardMaterial color="#174a40" metalness={0.25} roughness={0.63} />
        </mesh>

        <CircuitTrace start={[-1.04, -0.55]} end={[-0.68, -0.19]} />
        <CircuitTrace start={[-0.68, -0.19]} end={[-0.42, -0.19]} />
        <CircuitTrace start={[-1.02, 0.51]} end={[-0.63, 0.15]} />
        <CircuitTrace start={[-0.63, 0.15]} end={[-0.4, 0.15]} />
        <CircuitTrace start={[1.05, -0.52]} end={[0.7, -0.18]} />
        <CircuitTrace start={[0.7, -0.18]} end={[0.42, -0.18]} />
        <CircuitTrace start={[1.04, 0.49]} end={[0.66, 0.14]} />
        <CircuitTrace start={[0.66, 0.14]} end={[0.42, 0.14]} />
        <CircuitTrace start={[-1.05, 0]} end={[-0.77, 0]} width={0.018} />
        <CircuitTrace start={[1.05, 0]} end={[0.77, 0]} width={0.018} />

        {[-1, 1].flatMap(x => [-1, 1].map(z => <group key={`${x}-${z}`} position={[x * 1.14, 0.082, z * 0.76]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.085, 0.085, 0.024, 20]} />
              <meshStandardMaterial color="#b39458" metalness={0.85} roughness={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.014, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.026, 20]} />
              <meshStandardMaterial color="#0b1918" metalness={0.4} roughness={0.45} />
            </mesh>
          </group>))}

        <group position={[-0.78, 0.14, -0.34]}>
          <mesh castShadow><boxGeometry args={[0.4, 0.1, 0.34]} /><meshStandardMaterial color="#10191d" metalness={0.68} roughness={0.32} /></mesh>
          <mesh position={[0, 0.053, 0]}><boxGeometry args={[0.2, 0.009, 0.15]} /><meshStandardMaterial color="#62757a" metalness={0.78} roughness={0.28} /></mesh>
          {[[-0.17, -0.19], [0.17, -0.19], [-0.17, 0.19], [0.17, 0.19]].map(([x, z]) => <mesh key={`${x}-${z}`} position={[x, -0.01, z]}><boxGeometry args={[0.04, 0.07, 0.05]} /><meshStandardMaterial color="#d6bd83" metalness={0.8} roughness={0.25} /></mesh>)}
        </group>

        <group position={[0.79, 0.13, 0.33]}>
          <mesh castShadow><boxGeometry args={[0.32, 0.08, 0.27]} /><meshStandardMaterial color="#192327" metalness={0.55} roughness={0.38} /></mesh>
          {[[-0.12, -0.12], [0, -0.12], [0.12, -0.12], [-0.12, 0.12], [0, 0.12], [0.12, 0.12]].map(([x, z], index) => <mesh key={index} position={[x, 0.047, z]}><boxGeometry args={[0.055, 0.015, 0.045]} /><meshStandardMaterial color="#bd9d62" metalness={0.78} roughness={0.28} /></mesh>)}
        </group>

        {[-0.62, 0.62].map(x => <group key={x} position={[x, 0.13, 0.69]}>
            <mesh><boxGeometry args={[0.2, 0.1, 0.18]} /><meshStandardMaterial color="#182327" metalness={0.6} roughness={0.34} /></mesh>
            <mesh position={[0, 0.055, 0]}><boxGeometry args={[0.11, 0.014, 0.08]} /><meshStandardMaterial color="#bb9b65" metalness={0.82} roughness={0.27} /></mesh>
          </group>)}

        <group position={[0, 0.18, 0]}>
          <mesh castShadow position={[0, 0.11, 0]}>
            <cylinderGeometry args={[0.43, 0.48, 0.22, 48]} />
            <meshStandardMaterial color="#26363b" metalness={0.8} roughness={0.26} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <torusGeometry args={[0.34, 0.025, 10, 48]} />
            <meshStandardMaterial color="#b59b67" metalness={0.82} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.12, 48]} />
            <meshStandardMaterial color="#10191d" metalness={0.72} roughness={0.27} />
          </mesh>
          <mesh position={[0, 0.365, 0]}>
            <torusGeometry args={[0.31, 0.027, 10, 48]} />
            <meshBasicMaterial color="#65efdb" />
          </mesh>
          <group ref={scan} position={[0, 0.3, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.302, 0.302, 0.05, 48]} />
              <meshStandardMaterial color="#263238" metalness={0.58} roughness={0.25} />
            </mesh>
            <mesh position={[0, -0.17, 0.305]}>
              <boxGeometry args={[0.19, 0.035, 0.018]} />
              <meshStandardMaterial color="#081313" emissive="#35e8d2" emissiveIntensity={1.2} metalness={0.2} />
            </mesh>
            <mesh position={[0, -0.17, 0.317]}>
              <boxGeometry args={[0.08, 0.012, 0.008]} />
              <meshBasicMaterial color="#bdfff5" />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.29, 0]}>
              <torusGeometry args={[0.82, 0.008, 6, 80]} />
              <meshBasicMaterial color="#47f1dc" transparent opacity={0.75} />
            </mesh>
            <mesh position={[0.42, -0.29, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <boxGeometry args={[0.82, 0.009, 0.012]} />
              <meshBasicMaterial color="#67fff0" transparent opacity={0.78} />
            </mesh>
          </group>
        </group>

        {[-0.95, 0.95].map(x => <mesh key={x} position={[x, 0.087, 0]}><boxGeometry args={[0.12, 0.025, 0.46]} /><meshStandardMaterial color="#c4a15f" metalness={0.8} roughness={0.28} /></mesh>)}
      </group>
    </Float>;
}
export default function LidarScene() {
  return <Canvas camera={{
    position: [0, 2.7, 5.7],
    fov: 35
  }} dpr={window.innerWidth < 760 ? 1 : [1, 1.5]} gl={{
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  }} onCreated={({
    gl
  }) => gl.setClearColor('#000000', 0)}>
      <Suspense fallback={null}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 4]} intensity={2.3} color="#e0fffa" />
        <pointLight position={[-2, 1, 2]} intensity={11} color="#21d8c5" distance={7} />
        <pointLight position={[2, -1, -2]} intensity={5} color="#4b8eff" distance={6} />
        <LidarModule />
      </Suspense>
    </Canvas>;
}