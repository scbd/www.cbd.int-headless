import { type apiOptions } from "../types/api/api-options";

export default class apiBase
{
    $config : apiOptions = {}
    constructor($config:apiOptions) {
        this.$config = $config;
    }
}