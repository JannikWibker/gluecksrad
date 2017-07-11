const _cnv = ctx => { // cnv = canvas

  const circular = (max, value) => (value % (max)) || max

  const pi = (m = 1) => Math.PI * m

  const log = (base, x) => Math.log(x) / Math.log(base)

  const _pi = circular.bind(this, pi(2))

  const line = (x1, y1, x2, y2, color='black', width='1') => {
    ctx.beginPath()
    let _color = ctx.strokeStyle
    let _width = ctx.lineWidth
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.strokeStyle = _color
    ctx.lineWidth = _width
  }

  const circle = (x, y, r, angle1, angle2, color='black', fill, width='1') => {
    ctx.beginPath()
    let _color = ctx.strokeStyle
    let _width = ctx.lineWidth
    let _fill = ctx.fillStyle
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.fillStyle = fill
    ctx.arc(x, y, r, _pi(angle1), _pi(angle2))
    ctx.lineTo(x, y)
    ctx.closePath()
    if(fill) ctx.fill()
    if(color) ctx.stroke()
    ctx.strokeStyle = _color
    ctx.lineWidth = _width
    ctx.fillStyle = _fill
  }

  return {
    line, circle, pi, circular, log
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#canvas')
  const button = document.querySelector('#btn')

  let ctx = canvas.getContext('2d')
  cnv = _cnv(ctx)

  const w = canvas.width
  const h = canvas.height
  const pi = cnv.pi
  const padding = 10


  let field = (Math.random() * 4) | 0
  let offset = (() => ((field + 1) / 2) + Math.random() * 0.5)()



  let tx = -4
  console.log(tx)
  let ty = (tx) => done ? -offset : Math.pow(0.5, tx) - offset
  let done = false



  const draw = (isRequestAnimationFrame=false) => {
    console.log(ty(tx))
    const _circle = cnv.circle.bind(this, w / 2, h / 2, ((w + h) / 2 - padding) / 2)
    _circle(pi(0 + ty(tx)), pi(0.5 + ty(tx)), 'black', 'red', 0)
    _circle(pi(0.5 + ty(tx)), pi(1 + ty(tx)), 'black', 'green', 0)
    _circle(pi(1 + ty(tx)), pi(1.5 + ty(tx)), 'black', 'blue', 0)
    _circle(pi(1.5 + ty(tx)), pi(2 + ty(tx)), 'black', 'white', 0)
    if(ty(tx) <= 0.001 - offset) {
      done = true
    } else {
      tx = tx + 0.05
    }


    if(isRequestAnimationFrame && ty(tx) > 0.001 - offset) window.requestAnimationFrame(draw)
  }

  draw()

  btn.addEventListener('click', () => {
    window.requestAnimationFrame(draw.bind(this, true))
  })
})
