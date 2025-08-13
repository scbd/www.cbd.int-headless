import useApiFetch from './api-fetch';
import { type drupalToken } from '../types/drupal-token';

export default async function getToken() {
    const data = await useApiFetch(`/api/cms/drupal-token`) as drupalToken;
    return data;
};