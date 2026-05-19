"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // 生成灰烬粒子
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#5a4a3a]/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* 偶尔出现的火星 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-1 h-1 rounded-full bg-[#ffd700]"
          style={{
            left: `${20 + i * 15}%`,
            bottom: "20%",
          }}
          animate={{
            y: [0, -300],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
