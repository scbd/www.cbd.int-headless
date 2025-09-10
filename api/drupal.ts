import _ from "lodash";
import ApiBase from "./api-base";
import { createError } from "h3";
import { DrupalApiOptions } from "../types/api/drupal";

export default class DrupalApi extends ApiBase<DrupalApiOptions>
{
    constructor(config: DrupalApiOptions) {
        super(config);
    };

    async getRoute(path: string) {
        if(!path) {
            throw createError({
                statusCode: 400,
                statusMessage: `Bad request. Parameter path is required.`,
            });
        };
        
        try {
            const url = new URL(`${this.config.drupalBaseUrl}/router/translate-path`);
            url.searchParams.append('path', path);
            
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            let data = await response.json();

            /*
            // Move this to the service.
            data = Deserializer(data).map((item: any) => {
                return _.mapKeys(item, (key) => _.camelCase(key));
            });
            */

            return data;

        } catch (error: any) {
            throw createError({
                statusCode: error.statusCode || error.value?.statusCode || 500,
                statusMessage: error.value?.data || error.value,
            });
        };
    };

    async getContent(id: string, type: string) {
        if(!id || !type) {
            throw createError({
                statusCode: 400,
                statusMessage: `Bad request. Parameters url and type are required.`,
            });
        };

        try {
            const response = await fetch(`${this.config.drupalBaseUrl}/jsonapi/node/${type}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            let data = await response.json();

            /*
            data = Deserializer(data).map((item: any) => {
                return _.mapKeys(item, (key) => _.camelCase(key));
            });
            */

            return data;

        } catch (error: any) {
            // Replace the function with api-error.ts from Kronos
            throw createError({
                statusCode: error.statusCode || error.value?.statusCode || 500,
                statusMessage: error.value?.data || error.value,
            });
        };
    };

    async getMedia(id: string) {
        if(!id) {
            throw createError({
                statusCode: 400,
                statusMessage: `Bad request. Parameters url is required.`,
            });
        };

        try {
            const response = await fetch(`${this.config.drupalBaseUrl}/jsonapi/file/file/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            let data = await response.json();

            /*
            data = Deserializer(data).map((item: any) => {
                return _.mapKeys(item, (key) => _.camelCase(key));
            });
            */

            return data;

        } catch (error: any) {
            // Replace the function with api-error.ts from Kronos
            throw createError({
                statusCode: error.statusCode || error.value?.statusCode || 500,
                statusMessage: error.value?.data || error.value,
            });
        };
    };

    async getMenu(menu: string, limit?: string) {
        if(!menu) {
            throw createError({
                statusCode: 400,
                statusMessage: `Bad request. Parameter menu is required.`,
            });
        };

        if(!limit) limit = '100';

        try {
            const url = new URL(`${this.config.drupalBaseUrl}/jsonapi/menu_items/${menu}`);
            url.searchParams.append('page[limit]', limit);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            let data = await response.json();

            /*
            // Move this to the service.
            data = Deserializer(data).map((item: any) => {
                return _.mapKeys(item, (key) => _.camelCase(key));
            });
            */

            return data.data;

        } catch (error: any) {
            // Replace the function with api-error.ts from Kronos
            throw createError({
                statusCode: error.statusCode || error.value?.statusCode || 500,
                statusMessage: error.value?.data || error.value,
            });
        };
    };
};