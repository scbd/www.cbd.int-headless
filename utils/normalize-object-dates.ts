const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function normalizeObjectDates<T = any>(
  obj: T,
  options: { recursive?: boolean } = { recursive: true }
): T {
  // Handle ISO date string input
  if (typeof obj === 'string' && isoDateRegex.test(obj)) {
    return new Date(obj) as T;
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return (
      options.recursive
        ? obj.map((item) => normalizeObjectDates(item, options))
        : obj
    ) as T;
  }

  const result: any = {};
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string' && isoDateRegex.test(value)) {
      result[key] = new Date(value);
    } else if (typeof value === 'object' && options.recursive) {
      result[key] = normalizeObjectDates(value, options);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

export default normalizeObjectDates;
