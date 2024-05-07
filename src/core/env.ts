export interface Config {
  apiKey: string;
  platform: string;
}

export function getEnvConfig(): Partial<Config> {
  const result: Partial<Config> = {};

  if (process.env.AIGC_DETECTOR_API_KEY) {
    result.apiKey = process.env.AIGC_DETECTOR_API_KEY;
  }

  if (process.env.AIGC_DETECTOR_PLATFORM) {
    result.platform = process.env.AIGC_DETECTOR_PLATFORM;
  }

  return result;
}
