import { useEffect, useRef, useState } from "react"
import "./App.css"
import { KeysType } from "./types/keys"

function App() {
   const canvasRef = useRef<HTMLCanvasElement | null>(null)
   const containerRef = useRef<HTMLDivElement | null>(null)
   const contextRef = useRef<CanvasRenderingContext2D | null>(null)

   const [isGameOver, setIsGameOver] = useState(false)
   const [isGameActive, setIsGameActive] = useState(false)

   const [keys, setKeys] = useState<KeysType>({
      a: false,
      d: false,
      space: false,
   })

   useEffect(() => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return
      contextRef.current = canvas.getContext("2d")

      // Set canvas dimensions
      canvas.width = container.offsetHeight
      canvas.height = container.offsetWidth

      // Update canvas dimensions on window resize
      const handleResize = () => {
         canvas.width = container.offsetWidth
         canvas.height = container.offsetHeight
      }

      const keyDownHandler = ({key}: {key:string}) => {
         if (isGameOver) return
         switch (key) {
            case "a":
               keys.a = true
               break
            case "d":
               keys.d = true
               break
            case " ":
               keys.space = true
               // projectiles.push(
               //    new Projectile({
               //       position: {
               //          x: player.position.x + player.width / 2,
               //          y: player.position.y,
               //       },
               //       velocity: {
               //          x: 0,
               //          y: -projectileSpeed,
               //       },
               //    }),
               // )
               break
         }
      }

      const keyUpHandler = ({key}: {key:string}) => {
         switch (key) {
            case "a":
               keys.a = false
               break
            case "d":
               keys.d = false
               break
            case " ":
               keys.space = false
               break
         }
      }

      document.addEventListener("keydown", keyDownHandler)
      document.addEventListener("keyup", keyUpHandler )

      window.addEventListener("resize", handleResize)

      return () => {
         window.removeEventListener("resize", handleResize)
         document.removeEventListener("keydown", keyDownHandler)
         document.removeEventListener("keyup", keyUpHandler)
      }
   }, [])

   return (
      <div className="h-screen bg-black" ref={containerRef}>
         <canvas ref={canvasRef} className="w-full h-full" />
      </div>
   )
}

export default App
