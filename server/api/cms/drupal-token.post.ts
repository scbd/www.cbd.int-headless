import useApiFetch from '../../../composables/api-fetch';
import { type drupalToken } from '../../../types/drupal-token';
import domainCheck from '../../../utils/domain-check';
import { getHeader } from 'h3';

export default defineEventHandler(async (event) => {
    const origin = getHeader(event, 'origin') as string;

    if(!domainCheck(origin)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
            message: `Domain ${origin} is not allowed to access this resource.`
        });
    }

    const config = useRuntimeConfig();

    const method = 'POST';
    const cache = false;

    const headers = new URLSearchParams();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const options = new URLSearchParams();
    options.append('grant_type', 'client_credentials');
    options.append('client_id', config.drupalClientId);
    options.append('client_secret', config.drupalClientSecret);
    options.append('scope', config.drupalScope);

    const data = await useApiFetch(`${config.drupalUrl}/oauth/token`, method, cache, headers, options) as drupalToken;

    if(data) {
        data.timeout = Date.now() + (data.expires_in * 1000)
    }

    return data;
});