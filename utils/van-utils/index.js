export function noop() {}

export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function get(object, path) {
  const keys = path.split('.');
  let result = object;

  keys.forEach(key => {
    result = isDef(result[key]) ? result[key] : '';
  });

  return result;
}

const camelizeRE = /-(\w)/g;
export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function isAndroid() {
  /* istanbul ignore next */
  return /android/.test(navigator.userAgent.toLowerCase());
}

export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export function cached(fn) {
    const cache = Object.create(null);
    return (function cachedFn(str) {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
    any;
}

/**
 * Mix properties into target object.
 */
export function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr) {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached((str) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
});
