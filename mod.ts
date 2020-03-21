import "https://deno.land/std@v0.36.0/node/global.ts"
import * as DenoFS from "https://deno.land/std@v0.36.0/fs/mod.ts"
import * as path from "https://deno.land/std@v0.36.0/path/mod.ts"
import { process } from "https://deno.land/std@v0.36.0/node/process.ts"
import util from "https://dev.jspm.io/util@0.12.2"

const fs = {
  ...DenoFS,
  statSync: Deno.statSync,
  readFileSync: readFileSync
}

function readFileSync(path: string): string {
  const decoder = new TextDecoder()
  return decoder.decode(Deno.readFileSync(path))
}

export function env(): { [key: string]: string } {
  return Deno.env()
}

export function cwd(): string {
  return Deno.cwd()
}

export function require(module: string): any {
  const extname = path.extname(module)
  if (extname === '.json') {
    return JSON.parse(readFileSync(module))
  }

  switch (module) {
    default:
      throw new Error(`require('${module}') is not supported`)
  }
}

export function inspect(value: any): string {
  return Deno.inspect(value)
}

export function nextTick(): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), 0);
  });
}

export function isNotFoundError(error: any): boolean {
  return error instanceof Deno.errors.NotFound;
}

export { path, process, fs, util }

(require as any).resolve = (): void => {
  throw new Error('require.resolve() is not supported')
}

