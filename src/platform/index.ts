import Moonshot from './moonshot.js';
import OpenAI from './openai.js';

export enum Platform {
  Moonshot = 'moonshot',
  OpenAI = 'openai'
}

const platformMap = {
  [Platform.Moonshot]: Moonshot,
  [Platform.OpenAI]: OpenAI
};

export function getPlatform<K extends Platform>(platform: K): (typeof platformMap)[K] {
  return platformMap[platform];
}

export function getAvailablePlatforms(): string[] {
  return Object.keys(platformMap);
}
