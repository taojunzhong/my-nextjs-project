import { PrisonTitle } from "@/components/prison-title"
import { HeroGrid } from "@/components/hero-card"
import { JoinButton } from "@/components/join-button"
import { FloatingParticles } from "@/components/floating-particles"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* 背景效果 */}
      <FloatingParticles />
      
      {/* 背景栅格 */}
      <div className="fixed inset-0 prison-grid opacity-20 pointer-events-none z-0" />
      
      {/* 背景渐变 */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#8b0000]/5 to-transparent pointer-events-none z-0" />

      {/* 主要内容 */}
      <div className="relative z-10">
        {/* 顶部装饰条 */}
        <div className="h-2 bg-gradient-to-r from-transparent via-[#8b0000] to-transparent" />
        
        {/* 标题区域 */}
        <header>
          <PrisonTitle />
        </header>

        {/* 英雄卡片网格 */}
        <HeroGrid />

        {/* 加入按钮 */}
        <JoinButton />

        {/* 页脚 */}
        <Footer />
      </div>

      {/* 底部装饰 */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5a4a3a] to-transparent z-10" />
    </main>
  )
}
