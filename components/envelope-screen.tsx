"use client"

import { useState, useEffect } from "react"

interface EnvelopeScreenProps {
  onOpen: () => void
}

export default function EnvelopeScreen({ onOpen }: EnvelopeScreenProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleClick = () => {
    if (isOpening) return
    setIsOpening(true)
    setTimeout(onOpen, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-foreground/80 text-lg md:text-xl mb-12 font-serif tracking-wide">
          Нажми на конверт
        </p>
        
        <button
          onClick={handleClick}
          className={`relative cursor-pointer transition-transform duration-300 
            ${!isOpening ? "hover:scale-105 animate-float" : ""}`}
          aria-label="Открыть конверт"
        >
          <svg
            viewBox="0 0 200 140"
            className="w-48 h-36 md:w-64 md:h-48"
            style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }}
          >
            {/* Envelope body */}
            <rect
              x="10"
              y="30"
              width="180"
              height="100"
              rx="4"
              fill="#F5EDE4"
              stroke="#D4C4B5"
              strokeWidth="1.5"
            />
            
            {/* Inner shadow */}
            <rect
              x="15"
              y="35"
              width="170"
              height="90"
              rx="2"
              fill="#EDE5DC"
            />
            
            {/* Letter peeking out when opening */}
            {isOpening && (
              <rect
                x="30"
                y="40"
                width="140"
                height="80"
                rx="2"
                fill="#FFFEF9"
                className="animate-letter-rise"
              />
            )}
            
            {/* Envelope flap */}
            <path
              d={isOpening 
                ? "M10 30 L100 -20 L190 30" 
                : "M10 30 L100 80 L190 30"
              }
              fill="#F8F1E8"
              stroke="#D4C4B5"
              strokeWidth="1.5"
              className="transition-all duration-700 ease-out"
              style={{
                transformOrigin: "center top",
              }}
            />
            
            {/* Decorative heart seal */}
            <circle
              cx="100"
              cy={isOpening ? "-5" : "60"}
              r="12"
              fill="#E8B4B4"
              className="transition-all duration-700"
            />
            <path
              d={`M${100} ${isOpening ? 0 : 65} 
                 c-1-4-6-6-8-3 c-2 3 0 6 8 11 
                 c8-5 10-8 8-11 c-2-3-7-1-8 3`}
              fill="#C9787B"
              className="transition-all duration-700"
            />
          </svg>
        </button>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes letter-rise {
          0% { transform: translateY(0); }
          100% { transform: translateY(-30px); }
        }
        .animate-letter-rise {
          animation: letter-rise 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
