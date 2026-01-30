"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PasswordScreenProps {
  onSuccess: () => void
}

export default function PasswordScreen({ onSuccess }: PasswordScreenProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "190107s") {
      onSuccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-foreground/80 text-lg md:text-xl mb-8 font-serif tracking-wide">
          Чтобы открыть письмо — введи пароль
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-64 md:w-80 h-12 text-center text-lg bg-card border-border/50 
                focus:border-primary/50 focus:ring-primary/20 transition-all duration-300
                ${error ? "border-red-300 shake" : ""}`}
              placeholder="• • • • • • •"
            />
          </div>
          
          <Button
            type="submit"
            className="px-10 py-3 h-auto text-base font-medium bg-primary hover:bg-primary/90 
              text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            Открыть
          </Button>
          
          {error && (
            <p className="text-red-400/80 text-sm animate-pulse">
              Неверный пароль
            </p>
          )}
        </form>
      </div>
      
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}
