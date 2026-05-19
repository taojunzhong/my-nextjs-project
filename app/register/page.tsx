'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingParticles } from '@/components/floating-particles'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertCircle, CheckCircle2, Lock, Mail, User } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('请填写所有字段')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    if (formData.password.length < 6) {
      setError('密码长度不能少于6位')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (response.ok) {
        setSuccess('注册成功！请登录')
        setFormData({ username: '', email: '', password: '', confirmPassword: '' })
      } else {
        setError(data.message || '注册失败')
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <main className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      <FloatingParticles />
      
      <div className="fixed inset-0 prison-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#8b0000]/5 to-transparent pointer-events-none z-0" />

      <motion.div
        className="relative z-10 w-full max-w-md px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 text-center">
          <div className="relative inline-block">
            <Lock className="w-16 h-16 text-[#ffd700] mx-auto mb-4" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6">
              <CheckCircle2 className="w-full h-full text-[#8b0000]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#ffd700] tracking-wider">牢九门</h1>
          <p className="text-[#888888] mt-2">申请加入第九监狱</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/80 backdrop-blur-sm border-[#3a3a3a] shadow-2xl">
            <CardHeader className="border-b border-[#3a3a3a]">
              <CardTitle className="text-[#ffd700] flex items-center gap-2">
                <Lock className="w-5 h-5" />
                注册
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {success && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-3 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{success}</span>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-[#8b0000] bg-[#8b0000]/10 px-4 py-3 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[#e5e5e5]">
                    <User className="w-4 h-4 inline mr-2" />
                    用户名（囚号）
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="选择你的囚号"
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5] placeholder:text-[#555555] focus:border-[#ffd700] focus:ring-[#ffd700]"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#e5e5e5]">
                    <Mail className="w-4 h-4 inline mr-2" />
                    邮箱
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="输入你的邮箱"
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5] placeholder:text-[#555555] focus:border-[#ffd700] focus:ring-[#ffd700]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#e5e5e5]">
                    <Lock className="w-4 h-4 inline mr-2" />
                    密码
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="设置你的密码（至少6位）"
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5] placeholder:text-[#555555] focus:border-[#ffd700] focus:ring-[#ffd700]"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#e5e5e5]">
                    <Lock className="w-4 h-4 inline mr-2" />
                    确认密码
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="再次输入密码"
                    className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5] placeholder:text-[#555555] focus:border-[#ffd700] focus:ring-[#ffd700]"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#8b0000] to-[#6b0000] hover:from-[#a50000] hover:to-[#8b0000] text-[#ffd700] font-semibold border-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-[#ffd700] border-t-transparent rounded-full"
                      />
                      注册中...
                    </span>
                  ) : (
                    '加入囚室'
                  )}
                </Button>
              </form>

              <div className="border-t border-[#3a3a3a] pt-4 mt-4">
                <p className="text-center text-[#888888]">
                  已有囚号？{' '}
                  <Link
                    href="/login"
                    className="text-[#ffd700] hover:text-[#ffed4a] transition-colors underline underline-offset-4"
                  >
                    立即登录
                  </Link>
                </p>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent to-[#8b0000]" />
                <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-pulse" />
                <div className="w-12 h-1 bg-gradient-to-l from-transparent to-[#8b0000]" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 text-center text-[#555555] text-sm">
          <p>牢九门 · 第九监狱</p>
        </motion.div>
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5a4a3a] to-transparent z-10" />
    </main>
  )
}
