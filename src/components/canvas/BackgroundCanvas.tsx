import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({ position, color, size = 1, speed = 1, distort = 0.4 }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.y += Math.sin(time * speed) * 0.002;
    mesh.current.rotation.x = time * 0.1;
    mesh.current.rotation.y = time * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={mesh} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </Float>
  );
}

export function BackgroundCanvas() {
  return (
    <div className="absolute inset-0 bg-[#020205]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} />
        
        <AnimatedSphere position={[-2, 1, -1]} color="#22d3ee" size={1.4} speed={1.2} />
        <AnimatedSphere position={[3, -2, -2]} color="#3b82f6" size={1.6} speed={0.8} />
        <AnimatedSphere position={[-4, -3, -3]} color="#818cf8" size={1.2} speed={1.5} />
        <AnimatedSphere position={[5, 2, -4]} color="#0ea5e9" size={2} speed={0.5} />
        
        <fog attach="fog" args={["#020205", 5, 15]} />
      </Canvas>
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_#000_100%] pointer-events-none" />
    </div>
  );
}
