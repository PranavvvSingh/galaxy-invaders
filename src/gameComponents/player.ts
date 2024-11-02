import spaceship from "../assets/spaceship.png"

export class Player {
   velocity: { x: number; y: number }
   position: { x: number; y: number }
   rotate: number
   image?: HTMLImageElement
   height: number
   width: number
   opacity: number
   canvas: HTMLCanvasElement
   context: CanvasRenderingContext2D

   constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
      this.velocity = { x: 0, y: 0 }
      this.rotate = 0
      this.canvas = canvas // Store the canvas
      this.context = context // Store the context

      const img = new Image()
      img.src = spaceship
      const scale = 0.15

      img.onload = () => {
         this.image = img
         this.height = img.height * scale
         this.width = img.width * scale
         this.position = {
            x: this.canvas.width / 2 - this.width / 2,
            y: this.canvas.height - this.height - 20,
         }
      }

      this.position = { x: 0, y: 0 }
      this.height = 0
      this.width = 0
      this.opacity = 1
   }

   draw() {
      this.context.save()
      this.context.globalAlpha = this.opacity
      this.context.translate(
         this.position.x + this.width / 2,
         this.position.y + this.height / 2,
      )
      this.context.rotate(this.rotate)
      this.context.translate(
         -this.position.x - this.width / 2,
         -this.position.y - this.height / 2,
      )
      if (this.image) {
         this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
         )
      }
      this.context.restore()
   }

   update() {
      if (this.image) {
         this.draw()
         this.position.x += this.velocity.x
      }
   }
}
