export function solrImageUrl(url: string) {
  url = url.replace(
    /^https:\/\/www\.cbd\.int\//,
    'https://cms-dev.drupal.www.infra.cbd.int/sites/default/files/'
  );
  url = url.replace(/\.(docx?|pdf)$/i, '');
  return `${url}.jpg`;
}

export function missingImageUrl(event: Event) {
  const image: HTMLImageElement = event.target as HTMLImageElement;
  image.src = '/images/content-replacement.svg';
}
