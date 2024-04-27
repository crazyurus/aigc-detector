import MiniMax from './minimax';
import Moonshot from './moonshot';
import OpenAI from './openai';

export enum Platform {
  MiniMax = 'minimax',
  Moonshot = 'moonshot',
  OpenAI = 'openai'
}

const platformMap = {
  [Platform.MiniMax]: MiniMax,
  [Platform.Moonshot]: Moonshot,
  [Platform.OpenAI]: OpenAI
};

export function getPlatform(platform: Platform): MiniMax | Moonshot | OpenAI {
  return new platformMap[platform]();
}

export function getAvailablePlatforms(): string[] {
  return Object.keys(platformMap);
}
