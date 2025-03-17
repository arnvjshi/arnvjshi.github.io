"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text3D, OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { MathUtils } from "three"
import BrushStrokes from "./brush-strokes"

// Floating particles component
function Particles({ count = 200, color = "#ffffff" }) {
  const mesh = useRef()
  const { viewport } = useThree()

  // Create particles
  const particles = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * viewport.width * 2,
      (Math.random() - 0.5) * viewport.height * 2,
      (Math.random() - 0.5) * 10,
    ],
    size: Math.random() * 0.5 + 0.1,
  }))

  // Animate particles
  useFrame((state) => {
    if (!mesh.current) return

    mesh.current.rotation.x = MathUtils.lerp(mesh.current.rotation.x, state.mouse.y * 0.2, 0.1)
    mesh.current.rotation.y = MathUtils.lerp(mesh.current.rotation.y, state.mouse.x * 0.2, 0.1)
  })

  return (
    <group ref={mesh}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshStandardMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Animated 3D text
function AnimatedText({ text, position, scale, color, isIntro }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return

    if (isIntro) {
      // Intro animation
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    } else if (hovered) {
      // Hover animation
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1
    } else {
      // Subtle floating animation
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Text3D
        font="/fonts/Geist_Bold.json"
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} envMapIntensity={1} />
      </Text3D>
    </group>
  )
}

// Brush strokes background element
function BrushStrokesComponent({ count = 10, color = "#333333" }) {
  const group = useRef()
  const { viewport } = useThree()

  const brushStrokes = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * viewport.width * 1.5,
      (Math.random() - 0.5) * viewport.height * 1.5,
      -5 - Math.random() * 5,
    ],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    scale: [1 + Math.random() * 4, 0.1 + Math.random() * 0.3, 1],
  }))

  useFrame((state) => {
    if (!group.current) return

    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, state.mouse.y * 0.05, 0.1)
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, state.mouse.x * 0.05, 0.1)
  })

  return (
    <group ref={group}>
      {brushStrokes.map((stroke, i) => (
        <mesh key={i} position={stroke.position} rotation={stroke.rotation} scale={stroke.scale}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color={color} transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  )
}

// Main scene component
function Scene({ isIntro, isDarkMode }) {
  const cameraRef = useRef()
  const { viewport } = useThree()

  // Responsive positioning
  const textPosition = [0, 0, 0]
  const textScale = viewport.width < 10 ? [0.6, 0.6, 0.6] : [1, 1, 1]

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Environment preset="city" />

      <AnimatedText
        text="ARNAV JOSHI"
        position={textPosition}
        scale={textScale}
        color={isDarkMode ? "#ffffff" : "#000000"}
        isIntro={isIntro}
      />

      <Particles count={150} color={isDarkMode ? "#ffffff" : "#000000"} />
      <BrushStrokesComponent count={15} color={isDarkMode ? "#ffffff" : "#333333"} />
    </>
  )
}

// Main component
export default function ThreeBackground({ children, isDarkMode }) {
  const [isIntro, setIsIntro] = useState(true)

  useEffect(() => {
    // Switch from intro animation to subtle animation after 3 seconds
    const timer = setTimeout(() => {
      setIsIntro(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <Scene isIntro={isIntro} isDarkMode={isDarkMode} />
        </Canvas>
      </div>
      <BrushStrokes />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

