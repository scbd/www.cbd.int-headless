import ApiBase from "api-client/api-base";
import { badRequest, handleError } from "api-client/api-error";
import { DrupalApiOptions } from "../types/api/drupal";
export default class DrupalApi extends ApiBase
{
    constructor(config: DrupalApiOptions) {
        super({
            ...config,
            baseURL: config.drupalBaseUrl,
            onResponseError: handleError
        })
    };

    async getRoute(path: string) {
        if(!path) {
            throw badRequest("Parameter path is required.");
        };
        
        const data = await this.fetch(`/router/translate-path?path=${encodeURIComponent(path)}`);
        return data;
    };

    async getContent(id: string, type: string) {
        if(!id || !type) {
            throw badRequest("Parameter id and type are required.");
        };

        const data = await this.fetch(`/jsonapi/node/${encodeURIComponent(type)}/${encodeURIComponent(id)}`);
        return data;
    };

    async getMedia(id: string) {
        if(!id) {
            throw badRequest("Parameters id and type are required.");
        };

        const data = await this.fetch(`/jsonapi/file/file/${encodeURIComponent(id)}`);
        return data;
    };

    async getMenu(menu: string) {
        if(!menu) {
            throw badRequest("Parameter menu is required.");
        };

        const { data } = await this.fetch(`/jsonapi/menu_items/${encodeURIComponent(menu)}`);
        return data;
    };
};