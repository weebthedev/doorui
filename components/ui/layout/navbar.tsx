'use client'

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BsDoorOpenFill } from "react-icons/bs"
import { LogOut } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  React.useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken')
      setIsLoggedIn(!!token)
    }

    checkLoginStatus()
    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    router.push('/login')
  }

  const renderButton = () => {
    if (pathname === '/dashboard') {
      return (
        <Button onClick={handleLogout} className="flex items-center space-x-2">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      )
    } else if (pathname === '/' && isLoggedIn) {
      return (
        <Button onClick={() => router.push('/dashboard')} className="flex items-center space-x-2">
          <span>Go to Dashboard</span>
        </Button>
      )
    }
    return null
  }

  return (
    <nav className="backdrop-filter backdrop-blur-lg bg-opacity-30 sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <BsDoorOpenFill className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex items-center">
            {renderButton()}
          </div>
        </div>
      </div>
    </nav>
  )
}