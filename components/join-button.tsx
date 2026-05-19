"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function JoinButton() {
  const [showModal, setShowModal] = useState(false)
  const [showNote, setShowNote] = useState(false)

  const handleClick = () => {
    setShowModal(true)
    setTimeout(() => {
      setShowNote(true)
    }, 500)
  }

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 锁链装饰 */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <ChainLink />
            <ChainLink />
            <ChainLink />
          </div>

          {/* 加入按钮 */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative group
              px-12 py-4
              bg-gradient-to-r from-[#8b0000] via-[#6b0000] to-[#8b0000]
              border-2 border-[#ffd700]
              text-[#ffd700] text-xl md:text-2xl font-black
              tracking-widest
              overflow-hidden
              transition-all duration-300
              hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]
            "
          >
            {/* 锁链装饰 */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#4a4a4a]">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#4a4a4a]">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>

            {/* 按钮闪光效果 */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <span className="relative z-10">🔗 申请加入牢门 🔗</span>
          </motion.button>

          {/* 提示文字 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-[#888888] text-sm"
          >
            每个都是非常强势的T0.5，信我，开！
          </motion.p>
        </div>
      </section>

      {/* 弹出模态框 */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowModal(false)
              setShowNote(false)
            }}
          >
            {/* 背景遮罩 */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* 模态框内容 */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#1a1a1a] border-4 border-[#5a4a3a] p-8 max-w-md w-full"
            >
              {/* 铁窗效果 */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 prison-grid opacity-30" />
                {/* 垂直铁栏 */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 w-1 bg-[#4a4a4a]/50"
                    style={{ left: `${20 + i * 15}%` }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center">
                {/* 标题 */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  ⛓️
                </motion.div>

                <h3 className="text-2xl font-black text-[#ffd700] mb-4">
                  入牢成功！
                </h3>

                <div className="bg-[#8b0000]/30 border border-[#8b0000] p-4 mb-6">
                  <p className="text-[#e5e5e5] text-lg">
                    您已坐牢 <span className="text-[#ffd700] font-black text-2xl">999</span> 天
                  </p>
                </div>

                {/* 飘出纸条动画 */}
                <AnimatePresence>
                  {showNote && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, rotate: -5 }}
                      animate={{ opacity: 1, y: 0, rotate: 3 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-[#d4c4a8] p-4 transform shadow-xl mb-6"
                    >
                      <p className="text-[#1a1a1a] font-bold text-lg italic">
                        &ldquo;你变得懦弱了，老东西！&rdquo;
                      </p>
                      <p className="text-[#5a4a3a] text-sm mt-2">— 狱友留言</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => {
                    setShowModal(false)
                    setShowNote(false)
                  }}
                  className="px-6 py-2 bg-[#333333] border border-[#4a4a4a] text-[#888888] hover:text-[#ffd700] hover:border-[#ffd700] transition-colors"
                >
                  继续坐牢
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ChainLink() {
  return (
    <motion.div
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="w-8 h-4 border-4 border-[#4a4a4a] rounded-full"
    />
  )
}
