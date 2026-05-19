"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const titleChars = ["牢", "九", "门"]

export function PrisonTitle() {
  const [subtitleText, setSubtitleText] = useState("")
  const fullSubtitle = "这是当前版本最强势的九个对抗路，你敢跟他们对视三秒钟吗"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullSubtitle.length) {
        setSubtitleText(fullSubtitle.slice(0, index))
        index++
      } else {
        // Reset and loop
        setTimeout(() => {
          index = 0
          setSubtitleText("")
        }, 2000)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative py-16 md:py-24">
      {/* 背景锁链装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-[#4a4a4a] via-[#3a3a3a] to-transparent animate-chain-swing"
            style={{
              left: `${15 + i * 15}%`,
              top: 0,
              height: `${60 + Math.random() * 40}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* 主标题 */}
      <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
        {titleChars.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -50, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: index * 0.3,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="relative text-6xl md:text-8xl lg:text-9xl font-black"
            style={{
              color: "#ffd700",
              textShadow: `
                0 0 10px rgba(255, 215, 0, 0.5),
                0 0 20px rgba(255, 215, 0, 0.3),
                0 0 30px rgba(139, 0, 0, 0.5),
                2px 2px 0 #8b0000,
                4px 4px 0 #5a0000
              `,
              WebkitTextStroke: "1px #8b0000",
            }}
          >
            {/* 碎裂效果装饰 */}
            <motion.span
              className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black opacity-30"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
              style={{
                color: "transparent",
                WebkitTextStroke: "2px rgba(139, 0, 0, 0.5)",
              }}
            >
              {char}
            </motion.span>
            {char}
          </motion.span>
        ))}
      </div>

      {/* 副标题 - 打字机效果 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center px-4"
      >
        <p className="text-lg md:text-xl lg:text-2xl text-[#888888] font-medium">
          {subtitleText}
          <span className="inline-block w-0.5 h-6 bg-[#ffd700] ml-1 animate-pulse" />
        </p>
      </motion.div>

      {/* 装饰性文字 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="mt-6 text-center"
      >
        <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#8b0000]/30 via-[#8b0000]/50 to-[#8b0000]/30 border border-[#8b0000] text-[#ffd700] text-sm md:text-base font-bold tracking-widest">
          T0.5 强度认证 · 坐牢保障
        </span>
      </motion.div>
    </div>
  )
}
