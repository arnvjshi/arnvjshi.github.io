"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function FloatingParticles({ count = 80 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.002 + Math.random() / 200
      const xFactor = -30 + Math.random() * 60
      const yFactor = -15 + Math.random() * 30
      const zFactor = -15 + Math.random() * 30
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t) * 0.3 + 0.7
      dummy.position.set(
        (particle.xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10) / 1.5,
        (particle.yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10) / 1.5,
        (particle.zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10) / 1.5
      )
      dummy.scale.setScalar(s * 0.15)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
    </instancedMesh>
  )
}

function FloatingTorus() {
  const mesh = useRef()
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    mesh.current.rotation.y += 0.003
    mesh.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.2
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={2.5}>
      <torusKnotGeometry args={[1, 0.3, 128, 16, 2, 3]} />
      <meshStandardMaterial
        color="#0a0a0a"
        wireframe
        transparent
        opacity={0.15}
        emissive="#10b981"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function FloatingIcosahedron() {
  const mesh = useRef()
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.x += 0.002
    mesh.current.rotation.y += 0.003
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 + 2
    mesh.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 1.5 - 4
  })

  return (
    <mesh ref={mesh} scale={1.2}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#0a0a0a"
        wireframe
        transparent
        opacity={0.08}
        emissive="#06b6d4"
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

function FloatingOctahedron() {
  const mesh = useRef()
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.x -= 0.002
    mesh.current.rotation.z += 0.004
    mesh.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.5 - 1.5
    mesh.current.position.x = Math.sin(state.clock.elapsedTime * 0.25) * 2 + 5
  })

  return (
    <mesh ref={mesh} scale={0.9}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#0a0a0a"
        wireframe
        transparent
        opacity={0.1}
        emissive="#10b981"
        emissiveIntensity={0.08}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={0.1} color="#06b6d4" />
      <FloatingTorus />
      <FloatingIcosahedron />
      <FloatingOctahedron />
      <FloatingParticles count={60} />
    </>
  )
}

export default function ThreeHero() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
