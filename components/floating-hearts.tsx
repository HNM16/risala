"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const createHearts = () => {
      const newHearts: Heart[] = []
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 12 + 8,
          duration: Math.random() * 8 + 12,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.3 + 0.1,
        })
      }
      setHearts(newHearts)
    }
    createHearts()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-primary/60"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity, 0.2);
          }
          90% {
            opacity: var(--opacity, 0.2);
          }
          100% {
            transform: translateY(-110vh) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </div>
  )
}
