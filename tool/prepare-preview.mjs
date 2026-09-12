// Copyright (C) 2026 Toit contributors.
import { appendFile, writeFile } from 'node:fs/promises'

// Prevent indexing every path of the dev site, including HTML and schemas.
await appendFile('build/_headers', '\n/*\n  X-Robots-Tag: noindex, nofollow\n')
await writeFile('build/robots.txt', 'User-agent: *\nDisallow: /\n')
