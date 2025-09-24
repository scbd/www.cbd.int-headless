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