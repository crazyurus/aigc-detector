export interface Middleware {
  read(content: string): string;
  write(content: string): string;
}
