abstract class Platform {
  get baseURL(): string {
    return `https://${this.server}/v1`;
  }

  abstract model: string;

  abstract name: string;

  abstract server: string;
}

export default Platform;
