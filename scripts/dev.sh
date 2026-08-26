#!/bin/bash
# Starts the Next dev server.
#
# Prefers a real Node installation on PATH. Falls back to the temporary
# Node that was extracted to the session scratchpad so the site could be
# built and verified before Node was installed on this machine.
#
# ONCE YOU INSTALL NODE (https://nodejs.org, LTS), this script will pick it
# up automatically and the fallback below becomes dead weight — at that
# point you can delete this file and set .claude/launch.json back to:
#   "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"]

set -e
cd "$(dirname "$0")/.."

FALLBACK="/private/tmp/claude-501/-Users-rafatm7alla-Creative-Cloud-Files-jacbo229-ntmail-cc-c0383edc7a937425bc2710f11b0b8edc5eec270b4b09bbc5e5386dbc53e709a0/a10bd1d0-260a-49e8-8783-252f0731f28d/scratchpad/node/bin"

if command -v node >/dev/null 2>&1; then
  NODE="$(command -v node)"
elif [ -x "$FALLBACK/node" ]; then
  NODE="$FALLBACK/node"
  export PATH="$FALLBACK:$PATH"
else
  echo "Node not found. Install Node 20+ from https://nodejs.org, then run: npm run dev" >&2
  exit 1
fi

echo "Using node: $NODE ($("$NODE" -v))"
exec "$NODE" ./node_modules/next/dist/bin/next dev --port "${PORT:-3000}"
