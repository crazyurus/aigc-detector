import BaiChuan from './baichuan';
import MiniMax from './minimax';
import Moonshot from './moonshot';
import OpenAI from './openai';
import TongYi from './tongyi';
import ZhiPu from './zhipu';

export enum Platform {
  BaiChuan = 'baichuan',
  MiniMax = 'minimax',
  Moonshot = 'moonshot',
  OpenAI = 'openai',
  TongYi = 'tongyi',
  ZhiPu = 'zhipu'
}

const platformMap = {
  [Platform.BaiChuan]: BaiChuan,
  [Platform.MiniMax]: MiniMax,
  [Platform.Moonshot]: Moonshot,
  [Platform.OpenAI]: OpenAI,
  [Platform.TongYi]: TongYi,
  [Platform.ZhiPu]: ZhiPu
};

export function getPlatform(platform: Platform): BaiChuan | MiniMax | Moonshot | OpenAI | TongYi | ZhiPu {
  return new platformMap[platform]();
}

export function getAvailablePlatforms(): string[] {
  return Object.keys(platformMap);
}
