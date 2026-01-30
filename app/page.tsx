"use client"

import { useState } from "react"
import PasswordScreen from "@/components/password-screen"
import EnvelopeScreen from "@/components/envelope-screen"
import LetterScreen from "@/components/letter-screen"
import FloatingHearts from "@/components/floating-hearts"

type Screen = "password" | "envelope" | "letter"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("password")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handlePasswordSuccess = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScreen("envelope")
      setIsTransitioning(false)
    }, 600)
  }

  const handleEnvelopeOpen = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScreen("letter")
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {(currentScreen === "envelope" || currentScreen === "letter") && (
        <FloatingHearts />
      )}
      
      <div
        className={`transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentScreen === "password" && (
          <PasswordScreen onSuccess={handlePasswordSuccess} />
        )}
        {currentScreen === "envelope" && (
          <EnvelopeScreen onOpen={handleEnvelopeOpen} />
        )}
        {currentScreen === "letter" && <LetterScreen />}
      </div>
    </main>
  )
}
