import { matchesAny, parsePatterns } from './patterns.ts'

export function register(on: any, options?: Record<string, unknown>) {
  const patterns = parsePatterns(options?.tools)
  if (!patterns.length) return
  // The engine asks once per tool, when it first renders the tool's schema; a listed tool
  // is moved from behind ToolSearch into the prompt's tool list. Tools that are already
  // in the list, or that no pattern names, are left as the engine placed them.
  on('tool.describe', async ($: any, e: any, next: any) => {
    if (!e.isDeferred || !matchesAny(patterns, e.tool)) return next(e)
    // The placement is part of the answer, so override it on the result, not on the event
    return { ...(await next(e)), isDeferred: false }
  })
}
