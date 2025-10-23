import { joinURL } from 'ufo';
import { createOperationsGenerator } from '#image';
import type { ProviderGetImage } from '@nuxt/image';

const operationsGenerator = createOperationsGenerator();

export const getImage: ProviderGetImage = (src, { modifiers, baseURL }) => {
  if (!baseURL) {
    baseURL = `${useRuntimeConfig().drupalBaseUrl}/sites/default/files/`;
  }

  const operations = operationsGenerator(modifiers);

  return {
    url: joinURL(baseURL, src + (operations ? '?' + operations : '')),
  };
};
