import { isObj, cached, extend, toObject, hyphenate } from './index.js';

export function stringifyStyle(value) {
    if (isObj(value) && !Array.isArray(value)) {
        return stringifyObject(value);
    }
    return '';
}

export const parseStyleText = cached(function (cssText) {
    const res = {};
    const listDelimiter = /;(?![^(]*\))/g;
    const propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
        if (item) {
            const tmp = item.split(propertyDelimiter);
            tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
    const style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle
        ? extend(data.staticStyle, style)
        : style;
}

// normalize possible array / string values into Object
export function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle);
    }
    if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle);
    }
    return bindingStyle;
}

function stringifyObject(value) {
    let res = [];
    for (const key in value) {
        res.push(normalizeValue(hyphenate(key), value[key]));
    }
    return res.filter(e => e).join(' ');
}

function normalizeValue(key, value) {
    if (typeof value === 'string' ||
        (typeof value === 'number' && noUnitNumericStyleProps[key]) ||
        value === 0) {
        return `${key}:${value};`;
    }
    else {
        // invalid values
        return ``;
    }
}

export const noUnitNumericStyleProps = {
  "animation-iteration-count": true,
  "border-image-outset": true,
  "border-image-slice": true,
  "border-image-width": true,
  "box-flex": true,
  "box-flex-group": true,
  "box-ordinal-group": true,
  "column-count": true,
  "columns": true,
  "flex": true,
  "flex-grow": true,
  "flex-positive": true,
  "flex-shrink": true,
  "flex-negative": true,
  "flex-order": true,
  "grid-row": true,
  "grid-row-end": true,
  "grid-row-span": true,
  "grid-row-start": true,
  "grid-column": true,
  "grid-column-end": true,
  "grid-column-span": true,
  "grid-column-start": true,
  "font-weight": true,
  "line-clamp": true,
  "line-height": true,
  "opacity": true,
  "order": true,
  "orphans": true,
  "tab-size": true,
  "widows": true,
  "z-index": true,
  "zoom": true,
  // SVG
  "fill-opacity": true,
  "flood-opacity": true,
  "stop-opacity": true,
  "stroke-dasharray": true,
  "stroke-dashoffset": true,
  "stroke-miterlimit": true,
  "stroke-opacity": true,
  "stroke-width": true
}
