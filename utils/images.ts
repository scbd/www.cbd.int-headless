export function solrImageUrl(url?: string) {
  if (!url) {
    return '/images/content-replacement.svg';
  } else {
    url = url.replace(
      /^https:\/\/www\.cbd\.int\//,
      'https://cms-dev.drupal.www.infra.cbd.int/sites/default/files/'
    );

    url = url.replace(/\.(docx?|pdf)$/i, '');

    return `${url}.jpg`;
  }
}

export const missingImageUrl = '/images/content-replacement.svg';
