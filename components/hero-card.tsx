"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

interface Hero {
  id: number
  name: string
  nickname: string
  initial: string
  tagline: string
  winRate: string
  gradient: string
}

const heroes: Hero[] = [
  {
    id: 1,
    name: "吕布",
    nickname: "牢布",
    initial: "吕",
    tagline: "大招落地成盒，37%胜率稳坐牢门之首",
    winRate: "37%",
    gradient: "from-red-900 to-red-700",
  },
  {
    id: 2,
    name: "杨戬",
    nickname: "牢戬",
    initial: "杨",
    tagline: "狗到之处皆是噩耗，胜率常年垫底",
    winRate: "40%",
    gradient: "from-blue-900 to-blue-700",
  },
  {
    id: 3,
    name: "达摩",
    nickname: "牢摩",
    initial: "达",
    tagline: "一脚踢出团灭队友",
    winRate: "42%",
    gradient: "from-orange-900 to-orange-700",
  },
  {
    id: 4,
    name: "亚瑟",
    nickname: "牢亚瑟",
    initial: "亚",
    tagline: "沉默自己，快乐对手",
    winRate: "45%",
    gradient: "from-gray-700 to-gray-500",
  },
  {
    id: 5,
    name: "程咬金",
    nickname: "牢小金金",
    initial: "程",
    tagline: "回血赶不上掉血",
    winRate: "43%",
    gradient: "from-green-900 to-green-700",
  },
  {
    id: 6,
    name: "钟无艳",
    nickname: "牢锤",
    initial: "钟",
    tagline: "石化概率50%，石锤变石女",
    winRate: "41%",
    gradient: "from-pink-900 to-pink-700",
  },
  {
    id: 7,
    name: "曹操",
    nickname: "牢曹",
    initial: "曹",
    tagline: "三段位移三段送",
    winRate: "44%",
    gradient: "from-purple-900 to-purple-700",
  },
  {
    id: 8,
    name: "蒙恬",
    nickname: "牢恬",
    initial: "蒙",
    tagline: "开大直接变对面充电宝",
    winRate: "42%",
    gradient: "from-yellow-900 to-yellow-700",
  },
  {
    id: 9,
    name: "元歌",
    nickname: "牢歌",
    initial: "元",
    tagline: "傀儡比本体死得快",
    winRate: "40%",
    gradient: "from-cyan-900 to-cyan-700",
  },
]

const danmakuList = [
  "别选我，会不幸",
  "已经坐牢999天",
  "开！这把必C",
  "有的兄弟，有的有的",
  "T0.5强度，信我",
  "对面看到直接笑了",
  "我选完对面就投了（降）",
  "版本答案，开就完了",
  "不是坐牢是享受",
]

export function HeroCard({ hero, index }: { hero: Hero; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDanmaku, setShowDanmaku] = useState(false)
  const [currentDanmaku, setCurrentDanmaku] = useState("")

  const getRandomDanmaku = useCallback(() => {
    return danmakuList[Math.floor(Math.random() * danmakuList.length)]
  }, [])

  useEffect(() => {
    if (isHovered) {
      setCurrentDanmaku(getRandomDanmaku())
      setShowDanmaku(true)
      const interval = setInterval(() => {
        setCurrentDanmaku(getRandomDanmaku())
      }, 2000)
      return () => clearInterval(interval)
    } else {
      setShowDanmaku(false)
    }
  }, [isHovered, getRandomDanmaku])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      {/* 囚犯档案卡片 */}
      <div
        className={`
          relative overflow-hidden rounded-lg
          bg-gradient-to-br from-[#242424] to-[#1a1a1a]
          border-2 border-[#5a4a3a]
          rust-texture
          transition-all duration-300
          ${isHovered ? "animate-shake border-[#8b0000] shadow-[0_0_20px_rgba(139,0,0,0.5)]" : ""}
        `}
      >
        {/* 锈铁边框装饰 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#5a4a3a]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#5a4a3a]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#5a4a3a]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#5a4a3a]" />
        </div>

        {/* 血迹飞溅装饰 */}
        <div className="absolute -top-1 right-8 w-2 h-6 bg-gradient-to-b from-[#8b0000] to-transparent rounded-full opacity-70" />
        <div className="absolute -top-1 right-16 w-1.5 h-4 bg-gradient-to-b from-[#8b0000] to-transparent rounded-full opacity-50" />

        {/* 档案编号 */}
        <div className="absolute top-2 left-2 bg-[#8b0000] px-2 py-0.5 text-xs font-mono text-[#ffd700]">
          NO.{String(hero.id).padStart(3, "0")}
        </div>

        <div className="p-4 pt-8">
          {/* 头像占位符 */}
          <div className="flex justify-center mb-4">
            <div
              className={`
                w-20 h-20 rounded-full 
                bg-gradient-to-br ${hero.gradient}
                flex items-center justify-center
                border-4 border-[#4a4a4a]
                shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]
                group-hover:border-[#ffd700] transition-colors
              `}
            >
              <span className="text-3xl font-black text-white/90 drop-shadow-lg">
                {hero.initial}
              </span>
            </div>
          </div>

          {/* 英雄名称 */}
          <div className="text-center mb-2">
            <h3 className="text-xl font-black text-[#ffd700] tracking-wide">
              {hero.nickname}
            </h3>
            <p className="text-sm text-[#888888]">原名: {hero.name}</p>
          </div>

          {/* 自嘲槽点 */}
          <div className="bg-[#1a1a1a]/80 border border-[#3a3a3a] p-3 rounded mb-3">
            <p className="text-sm text-[#e5e5e5] leading-relaxed text-center">
              &ldquo;{hero.tagline}&rdquo;
            </p>
          </div>

          {/* 胜率显示 */}
          <div className="flex items-center justify-between bg-[#8b0000]/20 border border-[#8b0000]/50 px-3 py-2 rounded">
            <span className="text-xs text-[#888888]">近期胜率</span>
            <span className="text-lg font-black text-[#8b0000]">{hero.winRate}</span>
          </div>
        </div>

        {/* 悬停弹幕 */}
        <AnimatePresence>
          {showDanmaku && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="bg-[#ffd700] text-[#1a1a1a] px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
                {currentDanmaku}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function HeroGrid() {
  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* 标题 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#ffd700] mb-2">
            — 九大牢门英雄档案 —
          </h2>
          <p className="text-[#888888]">
            有的兄弟，有的，这么强的英雄当然不止一个，共九个
          </p>
        </div>

        {/* 3x3 网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.map((hero, index) => (
            <HeroCard key={hero.id} hero={hero} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
