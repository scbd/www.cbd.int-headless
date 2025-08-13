import { hash } from 'ohash';
import { $fetch } from 'ofetch';
import type { apiErrorParams } from '../types/api-fetch';

export class ApiError extends Error {
    status?: number;
    error?: unknown;
    
    constructor({ status, error, message }: apiErrorParams) {
        super(message, { cause: { error, status } });
        this.status = status;
        this.error  = error;
    }
}

export default async function useApiFetch<T>(
    path: string,
    method: string = 'GET',
    cache: boolean = true,
    headersParams?: URLSearchParams,
    bodyParams?: URLSearchParams,
):Promise<T> {
    
    const headers = headersParams ? Object.fromEntries(headersParams) : undefined

    if (!cache && bodyParams) {
        const key = hash({ ...Object.fromEntries(bodyParams), path, requestedOn: Date.now().toString() })
        bodyParams.set('key', key)
        bodyParams.set('cache', 'no-cache')
    }

    if (import.meta.server) {
    // Server: use $fetch
        try {
            return await $fetch<T>(path, { method, headers, body: bodyParams })
        } catch (error: any) {
            throw new ApiError({
                status: error.value?.statusCode,
                error: error.value?.data||error.value,
                message : `Error occurred executing ${method} / ${bodyParams} request for url ${path}`
            })
        }
    } else {
        // Client/app: use useFetch
        // @ts-expect-error auto-import by Nuxt
        const { data, error, status } = await useFetch<T>(path, {
            method,
            headers,
            body: bodyParams,
        })
        if (error?.value) {
            throw new ApiError({
                status: error.value?.statusCode,
                error: error.value?.data||error.value,
                message : `Error occurred executing ${method} / ${bodyParams} request for url ${path}`
            })
        }
    return data.value as T
    }
}