'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingParticles } from '@/components/floating-particles'
import { motion } from 'framer-motion'
import { AlertCircle, Check, Edit2, Save, User, Mail, Phone, FileText, Lock, Upload, X } from 'lucide-react'

interface UserInfo {
  id: number
  username: string
  email: string
  phone: string
  avatar: string
  bio: string
}

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    avatar: '',
    bio: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    console.log('ProfilePage - userId:', userId)
    console.log('ProfilePage - token:', token)
    
    if (!userId) {
      console.log('ProfilePage - userId为空，跳转到登录页')
      window.location.href = '/login'
      return
    }

    try {
      const response = await fetch(`/api/auth/user/${userId}`)
      const data = await response.json()
      console.log('ProfilePage - 获取用户信息响应:', data)
      
      if (data.code === 200 && data.data) {
        setUserInfo(data.data)
        setEditData({
          username: data.data.username,
          email: data.data.email,
          password: '',
          phone: data.data.phone || '',
          avatar: data.data.avatar || '',
          bio: data.data.bio || ''
        })
      } else {
        setError(data.message || '获取用户信息失败')
      }
    } catch (err) {
      console.error('ProfilePage - 获取用户信息异常:', err)
      setError('网络错误，请稍后重试')
    }
  }

  const handleSave = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) return

    setError('')
    setSuccess('')
    setIsLoading(true)

    const requestData = { ...editData }
    if (!requestData.password) delete requestData.password

    try {
      const response = await fetch(`/api/auth/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      const data = await response.json()
      
      if (response.ok) {
        setSuccess('更新成功')
        setUserInfo(data.data)
        setIsEditing(false)
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.message || '更新失败')
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        setEditData(prev => ({ ...prev, avatar: data.data }))
      } else {
        setError('头像上传失败')
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    }
  }

  if (!userInfo) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-[#d4a574]">加载中...</div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <FloatingParticles />
      
      <div className="fixed inset-0 prison-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#8b0000]/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-[#ffd700] tracking-wider mb-2">个人中心</h1>
          <p className="text-[#888888]">管理你的囚号信息</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-card/80 backdrop-blur-sm border-[#3a3a3a] shadow-2xl">
            <CardHeader className="border-b border-[#3a3a3a] flex flex-row items-center justify-between">
              <CardTitle className="text-[#ffd700] flex items-center gap-2">
                <User className="w-5 h-5" />
                个人资料
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(!isEditing)
                  setError('')
                  setSuccess('')
                }}
                className={isEditing ? 'bg-[#8b0000] text-[#ffd700] hover:bg-[#a50000]' : 'text-[#ffd700] hover:text-[#ffed4a] hover:bg-[#3a3a3a]'}
              >
                {isEditing ? (
                  <span className="flex items-center gap-1">
                    <X className="w-4 h-4" />
                    取消
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Edit2 className="w-4 h-4" />
                    编辑资料
                  </span>
                )}
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
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

              {success && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-[#00ff00] bg-[#00ff00]/10 px-4 py-3 rounded-lg"
                >
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>{success}</span>
                </motion.div>
              )}

              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ffd700] bg-[#1a1a1a]">
                    <img
                      src={editData.avatar || '/placeholder-user.jpg'}
                      alt="头像"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#8b0000] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#a50000] transition-colors">
                      <Upload className="w-4 h-4 text-[#ffd700]" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-xl font-semibold text-[#ffd700]">{userInfo.username}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#e5e5e5] flex items-center gap-2">
                      <User className="w-4 h-4" />
                      用户名
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editData.username}
                        onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                        className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5] focus:border-[#ffd700] focus:ring-[#ffd700]"
                        placeholder="输入用户名"
                      />
                    ) : (
                      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-[#e5e5e5]">
                        {userInfo.username}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#e5e5e5] flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      邮箱
                    </Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5] focus:border-[#ffd700] focus:ring-[#ffd700]"
                        placeholder="输入邮箱"
                      />
                    ) : (
                      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-[#e5e5e5]">
                        {userInfo.email}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#e5e5e5] flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      密码
                      {isEditing && <span className="text-xs text-[#555]">(留空则不修改)</span>}
                    </Label>
                    {isEditing ? (
                      <Input
                        type="password"
                        value={editData.password}
                        onChange={(e) => setEditData(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5] focus:border-[#ffd700] focus:ring-[#ffd700]"
                        placeholder="输入新密码"
                      />
                    ) : (
                      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-[#555]">
                        ********
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#e5e5e5] flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      电话
                    </Label>
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5] focus:border-[#ffd700] focus:ring-[#ffd700]"
                        placeholder="输入电话号码"
                      />
                    ) : (
                      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-[#e5e5e5]">
                        {userInfo.phone || '未设置'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#e5e5e5] flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    信息简述
                  </Label>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-[#e5e5e5] focus:border-[#ffd700] focus:ring-[#ffd700] resize-none"
                      rows={4}
                      placeholder="介绍一下你自己..."
                    />
                  ) : (
                    <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-[#e5e5e5] min-h-[80px]">
                      {userInfo.bio || '暂无简介'}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#8b0000] to-[#6b0000] hover:from-[#a50000] hover:to-[#8b0000] text-[#ffd700] font-semibold border-none transition-all duration-300"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-[#ffd700] border-t-transparent rounded-full"
                        />
                        保存中...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Save className="w-4 h-4" />
                        保存修改
                      </span>
                    )}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center text-[#555555] text-sm"
        >
          <p>牢九门 · 个人中心</p>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5a4a3a] to-transparent z-10" />
    </main>
  )
}