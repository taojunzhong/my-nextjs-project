"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-[#3a3a3a]">
      {/* 锈铁边框装饰 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5a4a3a] to-transparent" />

      <div className="max-w-4xl mx-auto text-center">
        {/* 签名 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-[#ffd700] text-lg font-bold mb-2">
            &ldquo;开！&rdquo;
          </p>
          <p className="text-[#888888] text-sm">
            — 千年，2025
          </p>
        </motion.div>

        {/* 梗说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[#242424] border border-[#3a3a3a] p-4 rounded mb-6"
        >
          <p className="text-[#888888] text-xs leading-relaxed">
            ⚠️ 免责声明：本页面纯属娱乐，数据均为调侃，并非真实胜率。<br />
            灵感来源于王者荣耀主播「千年」的直播名场面。<br />
            实际游戏中，每个英雄都有其独特价值，版本更迭也会改变强度。
          </p>
        </motion.div>

        {/* 底部文字 */}
        <div className="flex items-center justify-center gap-4 text-[#4a4a4a] text-xs">
          <span>牢九门</span>
          <span>·</span>
          <span>T0.5 认证</span>
          <span>·</span>
          <span>坐牢体验</span>
        </div>

        {/* 版权 */}
        <p className="mt-4 text-[#3a3a3a] text-xs">
          © 2025 牢九门坐牢联盟 | 纯属娱乐
        </p>
      </div>
    </footer>
  )
}
