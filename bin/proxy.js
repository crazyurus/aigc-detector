import { setGlobalDispatcher, ProxyAgent } from 'undici';

export function initProxy() {
  if (process.env.HTTPS_PROXY) {
    const dispatcher = new ProxyAgent({
      uri: process.env.HTTPS_PROXY
    });

    setGlobalDispatcher(dispatcher);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }
}
