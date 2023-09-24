import { renderToReadableStream } from "react-dom/server";
import { SimpleComponent } from './components/SimpleComponent'

Bun.serve({
  async fetch() {
    const stream = await renderToReadableStream(<SimpleComponent />)

    return new Response(stream, {
      headers: {
        "Content-Type": "text/html"
      }
    })
  }
})

console.log("Listening...")