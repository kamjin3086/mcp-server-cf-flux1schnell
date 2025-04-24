import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { generateImage } from "./text-to-image.js";

// Create an MCP server
const server = new McpServer({
  name: "Cloudflare Flux 1 Schnell Mcp Server",
  version: "1.0.0"
});

// Add an addition tool
server.tool("text-to-image", "Generate an image from a text prompt",
  { prompt: z.string(), steps: z.number().optional() },
  async ({ prompt, steps = 4 }) => {
    const resp = await generateImage({ prompt, steps });
    return { content: [{ type: "image", data: resp.image, mimeType: "image/png" }] }
  }       
);

// // Add a dynamic greeting resource
// server.resource(
//   "greeting",
//   new ResourceTemplate("greeting://{name}", { list: undefined }),
//   async (uri, { name }) => ({
//     contents: [{
//       uri: uri.href,
//       text: `Hello, ${name}!`
//     }]
//   })
// );

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);