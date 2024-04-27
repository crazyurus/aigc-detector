import Moonshot from './moonshot';
import OpenAI from './openai';

export enum Platform {
  Moonshot = 'moonshot',
  OpenAI = 'openai'
}

const platformMap = {
  [Platform.Moonshot]: Moonshot,
  [Platform.OpenAI]: OpenAI
};

export function getPlatform(platform: Platform): Moonshot | OpenAI {
  return new platformMap[platform]();
}

export function getAvailablePlatforms(): string[] {
  return Object.keys(platformMap);
}
