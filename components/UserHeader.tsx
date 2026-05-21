'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface UserInfo {
  id: number
  username: string
  avatar: string
}

export function UserHeader() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    console.log('UserHeader - userId:', userId)
    console.log('UserHeader - token:', token)
    
    if (!userId) {
      console.log('UserHeader - userId为空，不显示用户信息')
      return
    }

    try {
      const response = await fetch(`/api/auth/user/${userId}`)
      const data = await response.json()
      console.log('UserHeader - 获取用户信息响应:', data)
      
      if (data.code === 200 && data.data) {
        setUserInfo({
          id: data.data.id,
          username: data.data.username,
          avatar: data.data.avatar || ''
        })
        localStorage.setItem('username', data.data.username || '')
        localStorage.setItem('avatar', data.data.avatar || '')
      } else {
        console.log('UserHeader - 获取用户信息失败:', data.message)
      }
    } catch (err) {
      console.error('UserHeader - 获取用户信息异常:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    window.location.href = '/login'
  }

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const isLoginOrRegister = currentPath === '/login' || currentPath === '/register'

  if (isLoginOrRegister) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#3a3a3a] rounded-full px-3 py-2 hover:border-[#ffd700] transition-all duration-300">
            <Avatar className="w-8 h-8 border border-[#ffd700]">
              {userInfo?.avatar ? (
                <img src={userInfo.avatar} alt={userInfo.username} className="w-full h-full object-cover" />
              ) : (
                <AvatarFallback className="bg-[#8b0000] text-[#ffd700]">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-[#ffd700] text-sm font-medium hidden sm:inline">
              {userInfo?.username || '用户'}
            </span>
            <ChevronDown className="w-4 h-4 text-[#ffd700] hidden sm:inline" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#1a1a1a] border-[#3a3a3a] text-[#e5e5e5]">
          <DropdownMenuItem className="hover:bg-[#8b0000] hover:text-[#ffd700] cursor-pointer">
            <Link href="/profile" className="flex items-center gap-2 w-full">
              <User className="w-4 h-4" />
              <span>个人中心</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-[#8b0000] hover:text-[#ffd700] cursor-pointer">
            <Link href="/home" className="flex items-center gap-2 w-full">
              <Settings className="w-4 h-4" />
              <span>返回首页</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#3a3a3a]" />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="hover:bg-[#8b0000] hover:text-[#ffd700] cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}