# delay-no-more

A Claude Mod that lets you choose which tools Claude Code does **not** defer. By default many built-in tools and all MCP tools sit behind ToolSearch, so Claude must spend a turn fetching a schema before first use. Tools you list here have their schemas in the prompt from the first turn.

Requires Claude Code v2.1.287 or later.

## Install

```
claude --plugin-dir /path/to/cc-delay-no-more
```

## Configure

One option, `tools`: tool names separated by commas or spaces. `*` matches any characters. Names that match nothing are ignored. Empty (the default) changes nothing.

```json
{
  "pluginConfigs": {
    "delay-no-more@inline": {
      "options": { "tools": "WebSearch, WebFetch, mcp__github__*" }
    }
  }
}
```

Use `delay-no-more@<marketplace>` as the key when installed from a marketplace. Applies to new sessions.

MCP tool names are `mcp__<server>__<tool>` with the server name as configured (hyphens included).

## Trade-off

Every listed tool's schema costs prompt tokens on every request. List the tools you use constantly, not whole servers with dozens of tools.

## How it works

A `tool.describe` hook moves each matching deferred tool into the prompt's tool list (`isDeferred: false`). Other tools are untouched.
