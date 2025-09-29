import ApiBase from "api-client/api-base";
import { mandatory, handleError } from "api-client/api-error";
import type { DrupalApiOptions } from "../types/api/drupal";
export default class DrupalApi extends ApiBase
{
    constructor(options: {baseURL: string}) {
        super({
            ...options,
            onResponseError: handleError
        })
    };

    async getRoute(path: string) {
        if(!path) throw mandatory("path", "Parameter path is required.");
        
        const query = { path };
        const data = await this.fetch(`/router/translate-path`, { query });
        return data;
    };

    async getContent(id: string, type: string) {
        if(!id) throw mandatory("id", "Parameter id is required.");
        if(!type) throw mandatory("type", "Parameter type is required.");

        const data = await this.fetch(`/jsonapi/node/${encodeURIComponent(type)}/${encodeURIComponent(id)}`);
        return data;
    };

    async getMedia(id: string) {
        if(!id) throw mandatory("id", "Parameter id is required.");

        const data = await this.fetch(`/jsonapi/file/file/${encodeURIComponent(id)}`);
        return data;
    };

    async getMenu(menu: string) {
        if(!menu) throw mandatory("menu", "Parameter menu is required.");

        const { data } = await this.fetch(`/jsonapi/menu_items/${encodeURIComponent(menu)}`);
        return data;
    };
};