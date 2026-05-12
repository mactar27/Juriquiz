'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RigidBody, Physics, RapierRigidBody } from '@react-three/rapier'
import { Text, Environment, Float, Sparkles, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { DICE_FACES, DiceResult } from '@/types/game'

interface DiceProps {
  isRolling: boolean
  onRollComplete: (result: DiceResult) => void
  playerNames?: string[]
  targetFace?: number
}

// Face labels for the dice
const FACE_LABELS = ['1', '2', '3', '4', '5', '6']

function Dice({ isRolling, onRollComplete, playerNames = [], targetFace }: DiceProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [hasLanded, setHasLanded] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const velocityCheckRef = useRef({ frames: 0, stable: false })

  // Reset and throw dice when isRolling changes
  useEffect(() => {
    if (isRolling && rigidBodyRef.current) {
      setHasLanded(false)
      setShowSparkles(false)
      velocityCheckRef.current = { frames: 0, stable: false }

      // Reset position - High launch
      rigidBodyRef.current.setTranslation({ x: 0, y: 6, z: 0 }, true)
      
      // Random rotation
      const randomRotation = {
        x: Math.random() * Math.PI * 4,
        y: Math.random() * Math.PI * 4,
        z: Math.random() * Math.PI * 4,
      }
      rigidBodyRef.current.setRotation(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(randomRotation.x, randomRotation.y, randomRotation.z)
        ),
        true
      )

      // Apply strong random impulse and massive torque for "really spinning"
      rigidBodyRef.current.applyImpulse(
        {
          x: (Math.random() - 0.5) * 8,
          y: -12,
          z: (Math.random() - 0.5) * 8,
        },
        true
      )
      rigidBodyRef.current.applyTorqueImpulse(
        {
          x: (Math.random() - 0.5) * 25,
          y: (Math.random() - 0.5) * 25,
          z: (Math.random() - 0.5) * 25,
        },
        true
      )
    }
  }, [isRolling])

  // Check if dice has stopped
  useFrame(() => {
    if (!rigidBodyRef.current || hasLanded || !isRolling) return

    const velocity = rigidBodyRef.current.linvel()
    const angularVelocity = rigidBodyRef.current.angvel()
    
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2)
    const angularSpeed = Math.sqrt(angularVelocity.x ** 2 + angularVelocity.y ** 2 + angularVelocity.z ** 2)

    // Check if stable
    if (speed < 0.05 && angularSpeed < 0.05) {
      velocityCheckRef.current.frames++
      if (velocityCheckRef.current.frames > 35) {
        velocityCheckRef.current.stable = true
        setHasLanded(true)
        setShowSparkles(true)
        
        // Force the target face if provided to ensure sequential order
        if (targetFace !== undefined) {
          const targetQuat = new THREE.Quaternion()
          // Face mapping: 1:Up, 2:Front-ish, etc. (based on labels)
          if (targetFace === 1) targetQuat.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))
          else if (targetFace === 2) targetQuat.setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0))
          else if (targetFace === 3) targetQuat.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0))
          else if (targetFace === 4) targetQuat.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0))
          else if (targetFace === 5) targetQuat.setFromEuler(new THREE.Euler(0, 0, 0))
          else if (targetFace === 6) targetQuat.setFromEuler(new THREE.Euler(0, Math.PI, 0))
          
          rigidBodyRef.current.setRotation(targetQuat, true)
        }

        const face = targetFace || determineFaceUp(rigidBodyRef.current)
        const result = DICE_FACES[face]
        
        setTimeout(() => {
          onRollComplete(result)
        }, 700)
      }
    } else {
      velocityCheckRef.current.frames = 0
    }
  })

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        colliders="cuboid"
        restitution={0.6} // More bouncy
        friction={0.5}
        position={[0, 4, 0]}
      >
        <RoundedBox args={[1.3, 1.3, 1.3]} radius={0.15} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#4f46e5" // Indigo
            metalness={0.7}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#1e1b4b"
            emissiveIntensity={0.2}
          />
        </RoundedBox>
        
        {/* Face labels */}
        {[
          { pos: [0, 0, 0.66], rot: [0, 0, 0], face: 0 },
          { pos: [0, 0, -0.66], rot: [0, Math.PI, 0], face: 5 },
          { pos: [0.66, 0, 0], rot: [0, Math.PI / 2, 0], face: 2 },
          { pos: [-0.66, 0, 0], rot: [0, -Math.PI / 2, 0], face: 3 },
          { pos: [0, 0.66, 0], rot: [-Math.PI / 2, 0, 0], face: 1 },
          { pos: [0, -0.66, 0], rot: [Math.PI / 2, 0, 0], face: 4 },
        ].map(({ pos, rot, face }) => {
          const playerName = playerNames.length > 0 
            ? playerNames[face % playerNames.length] 
            : null
          
          // Dynamic font size based on name length
          const getFontSize = (name: string) => {
            if (name.length > 12) return 0.22
            if (name.length > 8) return 0.28
            if (name.length > 5) return 0.35
            return 0.45
          }
          
          return (
            <Text
              key={face}
              position={pos as [number, number, number]}
              rotation={rot as [number, number, number]}
              fontSize={playerName ? getFontSize(playerName) : 0.6}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.06}
              outlineColor="#c4a706" // Gold outline
              maxWidth={1.1} // Slightly narrower to avoid edges
              textAlign="center"
              overflowWrap="break-word"
              lineHeight={1}
            >
              {playerName ? playerName.toUpperCase() : '?'}
            </Text>
          )
        })}
      </RigidBody>

      {showSparkles && (
        <Sparkles
          count={100}
          scale={4}
          size={6}
          speed={0.8}
          color="#facc15" // Gold sparkles
        />
      )}
    </>
  )
}

// Determine which face is pointing up
function determineFaceUp(rigidBody: RapierRigidBody): number {
  const rotation = rigidBody.rotation()
  const quaternion = new THREE.Quaternion(
    rotation.x,
    rotation.y,
    rotation.z,
    rotation.w
  )
  
  // Face normals in local space
  const faceNormals = [
    new THREE.Vector3(0, 0, 1),   // Face 1
    new THREE.Vector3(0, 1, 0),   // Face 2
    new THREE.Vector3(1, 0, 0),   // Face 3
    new THREE.Vector3(-1, 0, 0),  // Face 4
    new THREE.Vector3(0, -1, 0),  // Face 5
    new THREE.Vector3(0, 0, -1),  // Face 6
  ]
  
  const up = new THREE.Vector3(0, 1, 0)
  let maxDot = -Infinity
  let topFace = 1
  
  faceNormals.forEach((normal, index) => {
    const worldNormal = normal.clone().applyQuaternion(quaternion)
    const dot = worldNormal.dot(up)
    if (dot > maxDot) {
      maxDot = dot
      topFace = index + 1
    }
  })
  
  return topFace
}

// Ground plane
function Ground() {
  return (
    <RigidBody type="fixed" friction={1}>
      <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 32]} />
        <meshStandardMaterial 
          color="#2e1065" 
          transparent 
          opacity={0.4}
        />
      </mesh>
    </RigidBody>
  )
}

// Walls to contain the dice
function Walls() {
  return (
    <>
      {[
        { pos: [0, 2, -4], rot: [0, 0, 0] },
        { pos: [0, 2, 4], rot: [0, Math.PI, 0] },
        { pos: [-4, 2, 0], rot: [0, Math.PI / 2, 0] },
        { pos: [4, 2, 0], rot: [0, -Math.PI / 2, 0] },
      ].map((wall, i) => (
        <RigidBody key={i} type="fixed">
          <mesh 
            position={wall.pos as [number, number, number]} 
            rotation={wall.rot as [number, number, number]}
          >
            <planeGeometry args={[8, 8]} />
            <meshStandardMaterial transparent opacity={0} />
          </mesh>
        </RigidBody>
      ))}
    </>
  )
}

function CameraController({ isRolling }: { isRolling: boolean }) {
  const { camera } = useThree()
  const targetPos = isRolling ? [0, 6, 8] : [0, 5, 7]
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos[0], 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos[1], 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos[2], 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

interface Dice3DProps {
  isRolling: boolean
  onRollComplete: (result: DiceResult) => void
  playerNames?: string[]
  targetFace?: number
}

export function Dice3D({ isRolling, onRollComplete, playerNames = [], targetFace }: Dice3DProps) {
  return (
    <div className="w-full aspect-square max-w-md mx-auto rounded-[3rem] overflow-hidden bg-gradient-to-b from-indigo-950/20 to-purple-900/20 border-4 border-white/10 shadow-inner relative">
      <Canvas
        shadows
        camera={{ position: [0, 8, 10], fov: 40 }}
      >
        <CameraController isRolling={isRolling} />
        <ambientLight intensity={1.5} />
        <spotLight
          position={[10, 20, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} color="purple" intensity={3} />
        
        <Physics gravity={[0, -30, 0]}>
          <Dice 
            isRolling={isRolling} 
            onRollComplete={onRollComplete} 
            playerNames={playerNames}
            targetFace={targetFace}
          />
          <Ground />
          <Walls />
        </Physics>
        
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
