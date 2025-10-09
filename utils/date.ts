export function formatDate(date: Date, locale?: string) {
    if(!date) return "";
    if(!locale) locale = "en";

    const convertedDate = typeof date === "string" ? new Date(date) : date;
    return Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(convertedDate);
};