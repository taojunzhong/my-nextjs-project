'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FloatingParticles } from '@/components/floating-particles'
import { Footer } from '@/components/footer'

export default function AddPrisonPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    prisonNumber: '',
    description: '',
    location: '',
    establishedDate: '',
    capacity: '',
    currentCount: '',
    securityLevel: '',
    wardenName: '',
    contactPhone: '',
    avatar: '',
    status: 1
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingAvatar(true)
    try {
      const formDataFile = new FormData()
      formDataFile.append('file', file)

      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formDataFile
      })
      const data = await response.json()
      
      if (data.code === 200) {
        setFormData(prev => ({
          ...prev,
          avatar: data.data
        }))
        alert('头像上传成功')
      } else {
        alert(data.message || '上传失败')
      }
    } catch (err) {
      alert('上传失败，请稍后重试')
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.prisonNumber) {
      alert('请填写必填项')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/prison/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          ...formData,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
          currentCount: formData.currentCount ? parseInt(formData.currentCount) : null
        })
      })
      
      const data = await response.json()
      if (data.code === 200) {
        alert('添加成功')
        router.push('/prison/list')
      } else {
        alert(data.message || '添加失败')
      }
    } catch (err) {
      alert('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <FloatingParticles />
      <div className="fixed inset-0 prison-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#8b0000]/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10">
        <div className="h-2 bg-gradient-to-r from-transparent via-[#8b0000] to-transparent" />
        
        {/* 头部导航 */}
        <header className="bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-[#8b0000]/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/prison/list" className="text-[#ffd700] hover:text-[#ffed4a] transition-colors">
                返回列表
              </Link>
              <span className="text-[#5a4a3a]">/</span>
              <span className="text-[#d4a574]">添加牢九门</span>
            </div>
          </div>
        </header>

        {/* 表单 */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-[#ffd700] mb-8 text-center">添加新牢九门</h1>
          
          <form onSubmit={handleSubmit} className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#8b0000]/30 rounded-lg p-8">
            {/* 头像上传 */}
            <div className="mb-8">
              <label className="block text-[#ffd700] font-semibold mb-3">牢九门头像</label>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 bg-gradient-to-br from-[#8b0000] to-[#5a0000] rounded-lg flex items-center justify-center overflow-hidden">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="头像" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl">🏛️</span>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={uploadingAvatar}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="px-6 py-2 bg-[#8b0000] hover:bg-[#a00000] text-[#ffd700] rounded-lg font-semibold cursor-pointer transition-all duration-300 inline-block"
                  >
                    {uploadingAvatar ? '上传中...' : '上传头像'}
                  </label>
                  <p className="text-[#d4a574] text-sm mt-2">支持 JPG、PNG 格式，最大 10MB</p>
                </div>
              </div>
            </div>

            {/* 基本信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#ffd700] font-semibold mb-2">
                  牢九门名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                  placeholder="请输入牢九门名称"
                />
              </div>
              
              <div>
                <label className="block text-[#ffd700] font-semibold mb-2">
                  牢九门编号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="prisonNumber"
                  value={formData.prisonNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                  placeholder="请输入牢九门编号"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#ffd700] font-semibold mb-2">描述</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors resize-none"
                placeholder="请输入牢九门描述"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#ffd700] font-semibold mb-2">位置</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                  placeholder="请输入位置"
                />
              </div>
              
              <div>
                <label className="block text-[#ffd700] font-semibold mb-2">成立日期</label>
                <input
                  type="date"
                  name="establishedDate"
                  value={formData.establishedDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#ffd700] font-semibold mb-2">容量</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                  placeholder="请输入容量"
                />
              </div>
              
              <div>
                <label className="block text-[#ffd700] font-semibold mb-2">当前人数</label>
                <input
                  type="number"
                  name="currentCount"
                  value={formData.currentCount}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                  placeholder="请输入当前人数"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#ffd700] font-semibold mb-2">安全等级</label>
                <select
                  name="securityLevel"
                  value={formData.securityLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                >
                  <option value="">请选择安全等级</option>
                  <option value="低">低</option>
                  <option value="中">中</option>
                  <option value="高">高</option>
                  <option value="最高">最高</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[#ffd700] font-semibold mb-2">狱长姓名</label>
                <input
                  type="text"
                  name="wardenName"
                  value={formData.wardenName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                  placeholder="请输入狱长姓名"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[#ffd700] font-semibold mb-2">联系电话</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#8b0000]/50 rounded-lg text-[#ffd700] focus:border-[#8b0000] focus:outline-none transition-colors"
                placeholder="请输入联系电话"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#8b0000] hover:bg-[#a00000] text-[#ffd700] rounded-lg font-semibold transition-all duration-300 disabled:opacity-50"
              >
                {loading ? '提交中...' : '提交'}
              </button>
              <Link
                href="/prison/list"
                className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#ffd700] border border-[#8b0000] rounded-lg font-semibold transition-all duration-300"
              >
                取消
              </Link>
            </div>
          </form>
        </div>

        <Footer />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5a4a3a] to-transparent z-10" />
    </main>
  )
}
