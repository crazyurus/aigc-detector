import BaiChuan from './baichuan';
import MiniMax from './minimax';
import Moonshot from './moonshot';
import OpenAI from './openai';

export enum Platform {
  BaiChuan = 'baichuan',
  MiniMax = 'minimax',
  Moonshot = 'moonshot',
  OpenAI = 'openai'
}

const platformMap = {
  [Platform.BaiChuan]: BaiChuan,
  [Platform.MiniMax]: MiniMax,
  [Platform.Moonshot]: Moonshot,
  [Platform.OpenAI]: OpenAI
};

export function getPlatform(platform: Platform): BaiChuan | MiniMax | Moonshot | OpenAI {
  return new platformMap[platform]();
}

export function getAvailablePlatforms(): string[] {
  return Object.keys(platformMap);
}
