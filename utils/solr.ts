import { Locale } from "../types/api/locale";
import { LTypeString, LTypeArray } from "../types/api/ltypes";
import Lstring from "api-client/types/lstring";
import _ from "lodash";


export function localizeFields(fields : string, locale?: string) {
    if(!fields)
        return;
          
    if(locale && locale != "en"){
        return fields.replace(/_EN/ig, "_" + (locale||"en").toUpperCase());
    };

    return fields;
};

export function solrEscape(value: string | number | Date) {

    if(value === undefined) throw "Value is undefined";
    if(value === null)      throw "Value is null";
    if(value === "")        throw "Value is null";

    if(_.isNumber(value)) value = value.toString();
    if(_.isDate  (value)) value = value.toISOString();

    value = value.toString();

    value = value.replace(/\\/g,   '\\\\');
    value = value.replace(/\+/g,   '\\+');
    value = value.replace(/\-/g,   '\\-');
    value = value.replace(/\&\&/g, '\\&&');
    value = value.replace(/\|\|/g, '\\||');
    value = value.replace(/\!/g,   '\\!');
    value = value.replace(/\(/g,   '\\(');
    value = value.replace(/\)/g,   '\\)');
    value = value.replace(/\{/g,   '\\{');
    value = value.replace(/\}/g,   '\\}');
    value = value.replace(/\[/g,   '\\[');
    value = value.replace(/\]/g,   '\\]');
    value = value.replace(/\^/g,   '\\^');
    value = value.replace(/\"/g,   '\\"');
    value = value.replace(/\~/g,   '\\~');
    value = value.replace(/\*/g,   '\\*');
    value = value.replace(/\?/g,   '\\?');
    value = value.replace(/\:/g,   '\\:');

    return value;
};

export function toLString(item: any, field: string, type: LTypeString = LTypeString.t, locales: Locale[] = Object.values(Locale)) : Lstring {
    return locales.reduce((ltext: Lstring, locale) => {
        const localeField = `${field}_${locale.toUpperCase()}_${type}`;
        const value = item[localeField];
        
        if(value === undefined || value === null) return ltext;

        ltext[locale as keyof Lstring] = item[localeField];
        return ltext;
    }, {} as Lstring);
};

export function toLStringArray(item: any, field: string, type: LTypeArray = LTypeArray.txt, locales: Locale[] = Object.values(Locale)) : Array<Lstring> {
    
    let maxEntries = 0;
    
    for (const locale of locales) {
        const localeField = `${field}_${locale.toUpperCase()}_${type}`;
        const value = item[localeField];
        
        maxEntries = Math.max(maxEntries, value?.length || 0);
    }
    
    if (maxEntries === 0) {
        return [];
    }
    
    const result: Lstring[] = [];
    
    for (let i = 0; i < maxEntries; i++) {
        const lstring = locales.reduce((ltext: Lstring, locale) => {
            const localeField = `${field}_${locale.toUpperCase()}_${type}`;
            const value = item[localeField];
            
            ltext[locale as keyof Lstring] = value[i];
            
            return ltext;
        }, {} as Lstring);
        
        result.push(lstring);
    }
    
    return result;
};

export function andOr(query: string | Array<string>, sep?: string) : string {

    sep = sep || "AND";

    if(_.isArray(query)) {

        query = _.map(query, function(criteria){

            if(_.isArray(criteria)) {
                return andOr(criteria, sep=="AND" ? "OR" : "AND");
            }

            return criteria;
        });

        query = '(' + query.join(' ' + sep + ' ') + ')';
    };

    return query;
};