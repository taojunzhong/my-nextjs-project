'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FloatingParticles } from '@/components/floating-particles'
import { Footer } from '@/components/footer'

interface Prison {
  id: number
  name: string
  prisonNumber: string
  description: string
  location: string
  establishedDate: string
  capacity: number
  currentCount: number
  securityLevel: string
  wardenName: string
  contactPhone: string
  avatar: string
  status: number
}

export default function PrisonListPage() {
  const [prisons, setPrisons] = useState<Prison[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPrisons()
  }, [])

  const fetchPrisons = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/prison/list', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      })
      const data = await response.json()
      if (data.code === 200) {
        setPrisons(data.data || [])
      } else {
        setError(data.message || '获取数据失败')
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个牢九门吗？')) return
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/prison/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      })
      const data = await response.json()
      if (data.code === 200) {
        alert('删除成功')
        fetchPrisons()
      } else {
        alert(data.message || '删除失败')
      }
    } catch (err) {
      alert('网络错误，请稍后重试')
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-[#ffd700] hover:text-[#ffed4a] transition-colors">
                  返回首页
                </Link>
                <span className="text-[#5a4a3a]">/</span>
                <span className="text-[#d4a574]">牢九门列表</span>
              </div>
              <Link
                href="/prison/add"
                className="px-6 py-2 bg-[#8b0000] hover:bg-[#a00000] text-[#ffd700] rounded-lg font-semibold transition-all duration-300"
              >
                添加新牢九门
              </Link>
            </div>
          </div>
        </header>

        {/* 页面标题 */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-[#ffd700] mb-8 text-center">牢九门列表</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-[#d4a574]">加载中...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-red-500">{error}</div>
            </div>
          ) : prisons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-[#d4a574] mb-4">暂无牢九门信息</p>
              <Link
                href="/prison/add"
                className="px-6 py-2 bg-[#8b0000] hover:bg-[#a00000] text-[#ffd700] rounded-lg font-semibold transition-all duration-300"
              >
                添加第一个牢九门
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prisons.map((prison) => (
                <div
                  key={prison.id}
                  className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#8b0000]/30 rounded-lg overflow-hidden hover:border-[#8b0000] transition-all duration-300"
                >
                  {/* 头像 */}
                  <div className="h-48 bg-gradient-to-br from-[#8b0000] to-[#5a0000] flex items-center justify-center relative">
                    {prison.avatar ? (
                      <img
                        src={prison.avatar}
                        alt={prison.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl">🏛️</div>
                    )}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-[#ffd700] text-[#1a1a1a] rounded text-xs font-semibold">
                      {prison.prisonNumber}
                    </div>
                  </div>

                  {/* 内容 */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#ffd700] mb-2">{prison.name}</h3>
                    <p className="text-[#d4a574] text-sm mb-4 line-clamp-2">
                      {prison.description || '暂无描述'}
                    </p>
                    
                    <div className="space-y-2 text-sm text-[#d4a574] mb-4">
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{prison.location || '暂无位置'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👤</span>
                        <span>狱长: {prison.wardenName || '暂无'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🔒</span>
                        <span>安全等级: {prison.securityLevel || '暂无'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span>容量: {prison.currentCount || 0} / {prison.capacity || 0}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/prison/edit?id=${prison.id}`}
                        className="flex-1 px-4 py-2 bg-[#8b0000] hover:bg-[#a00000] text-[#ffd700] rounded-lg font-semibold text-center transition-all duration-300"
                      >
                        编辑
                      </Link>
                      <button
                        onClick={() => handleDelete(prison.id)}
                        className="px-4 py-2 bg-[#2a2a2a] hover:bg-red-900 text-[#ffd700] rounded-lg font-semibold transition-all duration-300"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5a4a3a] to-transparent z-10" />
    </main>
  )
}
