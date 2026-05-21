'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FloatingParticles } from '@/components/floating-particles'
import { Footer } from '@/components/footer'

interface Prison {
  id: number
  name: string
  prisonNumber: string
  description: string
  location: string
  securityLevel: string
  wardenName: string
  contactPhone: string
  avatar: string
  status: number
}

interface Comment {
  id: number
  prisonId: number
  userId: number
  username: string
  content: string
  createTime: string
}

function PrisonDetailContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [prison, setPrison] = useState<Prison | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    if (id) {
      fetchPrison(id)
      fetchComments(id)
      
      const interval = setInterval(() => {
        if (id) {
          fetchComments(id)
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [id])

  const fetchPrison = async (prisonId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/prison/${prisonId}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      })
      const data = await response.json()
      if (data.code === 200) {
        setPrison(data.data)
      }
    } catch (err) {
      console.error('获取牢九门信息失败:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async (prisonId: string) => {
    try {
      const response = await fetch(`/api/comment/prison/${prisonId}`)
      const data = await response.json()
      if (data.code === 200) {
        setComments(data.data || [])
      }
    } catch (err) {
      console.error('获取评论失败:', err)
    }
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !id) return

    setIsSubmitting(true)
    try {
      const userId = localStorage.getItem('userId')
      const response = await fetch('/api/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId || '1'
        },
        body: JSON.stringify({
          prisonId: parseInt(id),
          content: newComment.trim()
        })
      })
      const data = await response.json()
      if (data.code === 200) {
        setNewComment('')
        await fetchComments(id)
      }
    } catch (err) {
      console.error('发表评论失败:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !id) return

    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg']
    if (!allowedTypes.includes(file.type)) {
      alert('请上传支持的视频格式（MP4、WebM、OGG）')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('prisonId', id)

    try {
      const response = await fetch('/api/upload/video', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.code === 200) {
        setVideoUrl(data.data)
        alert('视频上传成功')
      } else {
        alert('视频上传失败: ' + data.message)
      }
    } catch (err) {
      console.error('视频上传失败:', err)
      alert('视频上传失败')
    } finally {
      setIsUploading(false)
      setUploadProgress(100)
    }
  }

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateStr
    }
  }

  if (loading) {
    return (
      <main className="relative min-h-screen bg-background overflow-hidden">
        <FloatingParticles />
        <div className="fixed inset-0 prison-grid opacity-20 pointer-events-none z-0" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[#d4a574] text-xl">加载中...</div>
        </div>
      </main>
    )
  }

  if (!prison) {
    return (
      <main className="relative min-h-screen bg-background overflow-hidden">
        <FloatingParticles />
        <div className="fixed inset-0 prison-grid opacity-20 pointer-events-none z-0" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500 text-xl">牢九门不存在</div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <FloatingParticles />
      <div className="fixed inset-0 prison-grid opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#8b0000]/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10">
        <div className="h-2 bg-gradient-to-r from-transparent via-[#8b0000] to-transparent" />
        
        <header className="bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-[#8b0000]/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/prison/list" className="text-[#ffd700] hover:text-[#ffed4a] transition-colors">
                返回列表
              </Link>
              <span className="text-[#5a4a3a]">/</span>
              <span className="text-[#d4a574]">{prison.name}</span>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* 左侧：牢九门信息（30%宽度） */}
            <div className="w-[30%]">
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#8b0000]/30 rounded-lg overflow-hidden">
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
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#ffd700] mb-6">{prison.name}</h2>
                  <div className="space-y-4">
                    <div className="border-b border-[#8b0000]/30 pb-4">
                      <p className="text-[#5a4a3a] text-sm mb-1">描述</p>
                      <p className="text-[#d4a574]">{prison.description || '暂无描述'}</p>
                    </div>
                    <div className="border-b border-[#8b0000]/30 pb-4">
                      <p className="text-[#5a4a3a] text-sm mb-1">位置</p>
                      <p className="text-[#d4a574] flex items-center gap-2">
                        <span>📍</span>{prison.location || '暂无位置'}
                      </p>
                    </div>
                    <div className="border-b border-[#8b0000]/30 pb-4">
                      <p className="text-[#5a4a3a] text-sm mb-1">狱长</p>
                      <p className="text-[#d4a574] flex items-center gap-2">
                        <span>👤</span>{prison.wardenName || '暂无'}
                      </p>
                    </div>
                    <div className="border-b border-[#8b0000]/30 pb-4">
                      <p className="text-[#5a4a3a] text-sm mb-1">安全等级</p>
                      <p className="text-[#d4a574] flex items-center gap-2">
                        <span>🔒</span>{prison.securityLevel || '暂无'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#5a4a3a] text-sm mb-1">联系电话</p>
                      <p className="text-[#d4a574] flex items-center gap-2">
                        <span>📞</span>{prison.contactPhone || '暂无'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：视频和评论 */}
            <div className="flex-1">
              {/* 视频区域 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#8b0000]/30 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#ffd700]">视频区域</h3>
                  <label className="px-4 py-2 bg-[#8b0000] hover:bg-[#a00000] text-[#ffd700] rounded-lg font-semibold transition-all duration-300 cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                    {isUploading ? '上传中...' : '上传视频'}
                  </label>
                </div>
                {isUploading && (
                  <div className="mb-4">
                    <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8b0000] transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="h-64 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg flex items-center justify-center border border-[#8b0000]/30 overflow-hidden">
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-full object-contain"
                      poster="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎬</div>
                      <p className="text-[#d4a574]">还没有视频哦</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 评论区域 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#8b0000]/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#ffd700] mb-4">评论区</h3>
                
                {/* 发表评论 */}
                <div className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="发表你的评论..."
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#8b0000]/30 rounded-lg text-[#d4a574] placeholder-[#5a4a3a] focus:border-[#8b0000] focus:outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || isSubmitting}
                      className="px-6 py-2 bg-[#8b0000] hover:bg-[#a00000] disabled:bg-[#3a3a3a] disabled:cursor-not-allowed text-[#ffd700] rounded-lg font-semibold transition-all duration-300"
                    >
                      {isSubmitting ? '发表中...' : '发表评论'}
                    </button>
                  </div>
                </div>

                {/* 评论列表 */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {comments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[#d4a574]">暂无评论，快来发表第一条评论吧！</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-[#2a2a2a]/50 rounded-lg p-4 border border-[#8b0000]/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#ffd700] font-semibold">{comment.username}</span>
                          <span className="text-[#5a4a3a] text-sm">{formatTime(comment.createTime)}</span>
                        </div>
                        <p className="text-[#d4a574]">{comment.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5a4a3a] to-transparent z-10" />
    </main>
  )
}

export default function PrisonDetailPage() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen bg-background overflow-hidden">
        <FloatingParticles />
        <div className="fixed inset-0 prison-grid opacity-20 pointer-events-none z-0" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[#d4a574] text-xl">加载中...</div>
        </div>
      </main>
    }>
      <PrisonDetailContent />
    </Suspense>
  )
}