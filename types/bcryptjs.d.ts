declare module 'bcryptjs' {
  export function hash(s: string, salt: number | string): Promise<string>
  export function compare(s: string, hash: string): Promise<boolean>
  export default {
    hash: (s: string, salt: number | string) => Promise<string>,
    compare: (s: string, hash: string) => Promise<boolean>
  }
}
