import { FloatingParticles } from "@/components/floating-particles"
import { Footer } from "@/components/footer"
import Link from "next/link"

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
        
        {/* 欢迎标题 */}
        <header className="pt-20 pb-16 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-[#ffd700] mb-6 animate-fade-in">
              欢迎访问管理系统
            </h1>
            <p className="text-xl md:text-2xl text-[#d4a574] mb-8 animate-fade-in-delay">
              牢九门信息管理系统
            </p>
            <div className="flex justify-center gap-4 animate-fade-in-delay-2">
              <Link
                href="/prison/list"
                className="px-8 py-3 bg-[#8b0000] hover:bg-[#a00000] text-[#ffd700] rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                查看牢九门列表
              </Link>
              <Link
                href="/prison/add"
                className="px-8 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#ffd700] border border-[#8b0000] rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                添加新牢九门
              </Link>
            </div>
          </div>
        </header>

        {/* 功能介绍 */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#ffd700] text-center mb-12">系统功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#8b0000]/30 rounded-lg p-6 hover:border-[#8b0000] transition-all duration-300">
                <div className="w-12 h-12 bg-[#8b0000] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-semibold text-[#ffd700] mb-3">信息管理</h3>
                <p className="text-[#d4a574]">完善的牢九门信息管理功能，包括基本信息和详细资料</p>
              </div>
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#8b0000]/30 rounded-lg p-6 hover:border-[#8b0000] transition-all duration-300">
                <div className="w-12 h-12 bg-[#8b0000] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📤</span>
                </div>
                <h3 className="text-xl font-semibold text-[#ffd700] mb-3">头像上传</h3>
                <p className="text-[#d4a574]">支持上传牢九门标志图片，展示独特形象</p>
              </div>
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#8b0000]/30 rounded-lg p-6 hover:border-[#8b0000] transition-all duration-300">
                <div className="w-12 h-12 bg-[#8b0000] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-[#ffd700] mb-3">安全可靠</h3>
                <p className="text-[#d4a574]">用户认证系统，保护数据安全和隐私</p>
              </div>
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <Footer />
      </div>

      {/* 底部装饰 */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5a4a3a] to-transparent z-10" />
    </main>
  )
}
