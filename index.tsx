import { renderToReadableStream } from "react-dom/server";
import { SimpleComponent } from './components/SimpleComponent'
import { SimpleComponentList } from './components/SimpleComponentList'

Bun.serve({
  async fetch(request) {
    const url = new URL(request.url)


    if (url.pathname === '/simple') {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon')

      const { results } = (await response.json()) as any

      const stream = await renderToReadableStream(<SimpleComponentList components={results} />)

      return new Response(stream, {
        headers: {
          "Content-Type": "text/html"
        }
      })
    }

    const simpleNameRegex = /^\/simple\/([a-zA-Z0-9_-]+)$/
    const match = url.pathname.match(simpleNameRegex)

    if (match) {
      const simpleName = match[1]

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${simpleName}`)

      if (response.status === 404) {
        return new Response("Not found", { status: 404 })
      }

      const {
        height, name, weight, sprites: { front_default }
      } = (await response.json()) as any

      const stream = await renderToReadableStream(<SimpleComponent name={name} height={height} weight={weight} img={front_default} />)

      return new Response(stream, {
        headers: {
          "Content-Type": "text/html"
        }
      })
    }

    return new Response("Not found", { status: 404 })
  }
})

console.log("Listening...")