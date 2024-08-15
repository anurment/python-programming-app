// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import { promisify } from "./internal/util.mjs";
import { callbackify } from "./_util/_util_callbackify.ts";
import { debuglog } from "./internal/util/debuglog.ts";
import { deprecate } from "./internal/util.mjs";
import { format, formatWithOptions, inspect, stripVTControlCharacters } from "./internal/util/inspect.mjs";
import { codes } from "./internal/error_codes.ts";
import { errorMap } from "./internal_binding/uv.ts";
import types from "./util/types.mjs";
import { Buffer } from "./buffer.ts";
import { isDeepStrictEqual } from "./internal/util/comparisons.ts";
export { callbackify, debuglog, deprecate, format, formatWithOptions, inspect, promisify, stripVTControlCharacters, types };
const NumberIsSafeInteger = Number.isSafeInteger;
/** @deprecated - use `Array.isArray()` instead. */ export function isArray(value) {
    return Array.isArray(value);
}
/** @deprecated - use `typeof value === "boolean" || value instanceof Boolean` instead. */ export function isBoolean(value) {
    return typeof value === "boolean" || value instanceof Boolean;
}
/** @deprecated - use `value === null` instead. */ export function isNull(value) {
    return value === null;
}
/** @deprecated - use `value === null || value === undefined` instead. */ export function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
/** @deprecated - use `typeof value === "number" || value instanceof Number` instead. */ export function isNumber(value) {
    return typeof value === "number" || value instanceof Number;
}
/** @deprecated - use `typeof value === "string" || value instanceof String` instead. */ export function isString(value) {
    return typeof value === "string" || value instanceof String;
}
/** @deprecated - use `typeof value === "symbol"` instead. */ export function isSymbol(value) {
    return typeof value === "symbol";
}
/** @deprecated - use `value === undefined` instead. */ export function isUndefined(value) {
    return value === undefined;
}
/** @deprecated - use `value !== null && typeof value === "object"` instead. */ export function isObject(value) {
    return value !== null && typeof value === "object";
}
/** @deprecated - use `e instanceof Error` instead. */ export function isError(e) {
    return e instanceof Error;
}
/** @deprecated - use `typeof value === "function"` instead. */ export function isFunction(value) {
    return typeof value === "function";
}
/** @deprecated Use util.types.RegExp() instead. */ export function isRegExp(value) {
    return types.isRegExp(value);
}
/** @deprecated Use util.types.isDate() instead. */ export function isDate(value) {
    return types.isDate(value);
}
/** @deprecated - use `value === null || (typeof value !== "object" && typeof value !== "function")` instead. */ export function isPrimitive(value) {
    return value === null || typeof value !== "object" && typeof value !== "function";
}
/** @deprecated  Use Buffer.isBuffer() instead. */ export function isBuffer(value) {
    return Buffer.isBuffer(value);
}
/** @deprecated Use Object.assign() instead. */ export function _extend(target, source) {
    // Don't do anything if source isn't an object
    if (source === null || typeof source !== "object") return target;
    const keys = Object.keys(source);
    let i = keys.length;
    while(i--){
        target[keys[i]] = source[keys[i]];
    }
    return target;
}
/**
 * Returns a system error name from an error code number.
 * @param code error code number
 */ export function getSystemErrorName(code) {
    if (typeof code !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE("err", "number", code);
    }
    if (code >= 0 || !NumberIsSafeInteger(code)) {
        throw new codes.ERR_OUT_OF_RANGE("err", "a negative integer", code);
    }
    return errorMap.get(code)?.[0];
}
/**
 * https://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor
 * @param ctor Constructor function which needs to inherit the prototype.
 * @param superCtor Constructor function to inherit prototype from.
 */ export function inherits(ctor, superCtor) {
    if (ctor === undefined || ctor === null) {
        throw new codes.ERR_INVALID_ARG_TYPE("ctor", "Function", ctor);
    }
    if (superCtor === undefined || superCtor === null) {
        throw new codes.ERR_INVALID_ARG_TYPE("superCtor", "Function", superCtor);
    }
    if (superCtor.prototype === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("superCtor.prototype", "Object", superCtor.prototype);
    }
    Object.defineProperty(ctor, "super_", {
        value: superCtor,
        writable: true,
        configurable: true
    });
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}
import { _TextDecoder, _TextEncoder } from "./_utils.ts";
export const TextDecoder = _TextDecoder;
export const TextEncoder = _TextEncoder;
function pad(n) {
    return n.toString().padStart(2, "0");
}
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
/**
 * @returns 26 Feb 16:19:34
 */ function timestamp() {
    const d = new Date();
    const t = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
    ].join(":");
    return `${d.getDate()} ${months[d.getMonth()]} ${t}`;
}
/**
 * Log is just a thin wrapper to console.log that prepends a timestamp
 * @deprecated
 */ // deno-lint-ignore no-explicit-any
function log(...args) {
    console.log("%s - %s", timestamp(), format(...args));
}
export default {
    format,
    formatWithOptions,
    inspect,
    isArray,
    isBoolean,
    isNull,
    isNullOrUndefined,
    isNumber,
    isString,
    isSymbol,
    isUndefined,
    isObject,
    isError,
    isFunction,
    isRegExp,
    isDate,
    isPrimitive,
    isBuffer,
    _extend,
    getSystemErrorName,
    deprecate,
    callbackify,
    promisify,
    inherits,
    types,
    stripVTControlCharacters,
    TextDecoder,
    TextEncoder,
    log,
    debuglog,
    isDeepStrictEqual
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvdXRpbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSBcIi4vaW50ZXJuYWwvdXRpbC5tanNcIjtcbmltcG9ydCB7IGNhbGxiYWNraWZ5IH0gZnJvbSBcIi4vX3V0aWwvX3V0aWxfY2FsbGJhY2tpZnkudHNcIjtcbmltcG9ydCB7IGRlYnVnbG9nIH0gZnJvbSBcIi4vaW50ZXJuYWwvdXRpbC9kZWJ1Z2xvZy50c1wiO1xuaW1wb3J0IHsgZGVwcmVjYXRlIH0gZnJvbSBcIi4vaW50ZXJuYWwvdXRpbC5tanNcIjtcbmltcG9ydCB7XG4gIGZvcm1hdCxcbiAgZm9ybWF0V2l0aE9wdGlvbnMsXG4gIGluc3BlY3QsXG4gIHN0cmlwVlRDb250cm9sQ2hhcmFjdGVycyxcbn0gZnJvbSBcIi4vaW50ZXJuYWwvdXRpbC9pbnNwZWN0Lm1qc1wiO1xuaW1wb3J0IHsgY29kZXMgfSBmcm9tIFwiLi9pbnRlcm5hbC9lcnJvcl9jb2Rlcy50c1wiO1xuaW1wb3J0IHsgZXJyb3JNYXAgfSBmcm9tIFwiLi9pbnRlcm5hbF9iaW5kaW5nL3V2LnRzXCI7XG5pbXBvcnQgdHlwZXMgZnJvbSBcIi4vdXRpbC90eXBlcy5tanNcIjtcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCIuL2J1ZmZlci50c1wiO1xuaW1wb3J0IHsgaXNEZWVwU3RyaWN0RXF1YWwgfSBmcm9tIFwiLi9pbnRlcm5hbC91dGlsL2NvbXBhcmlzb25zLnRzXCI7XG5cbmV4cG9ydCB7XG4gIGNhbGxiYWNraWZ5LFxuICBkZWJ1Z2xvZyxcbiAgZGVwcmVjYXRlLFxuICBmb3JtYXQsXG4gIGZvcm1hdFdpdGhPcHRpb25zLFxuICBpbnNwZWN0LFxuICBwcm9taXNpZnksXG4gIHN0cmlwVlRDb250cm9sQ2hhcmFjdGVycyxcbiAgdHlwZXMsXG59O1xuXG5jb25zdCBOdW1iZXJJc1NhZmVJbnRlZ2VyID0gTnVtYmVyLmlzU2FmZUludGVnZXI7XG5cbi8qKiBAZGVwcmVjYXRlZCAtIHVzZSBgQXJyYXkuaXNBcnJheSgpYCBpbnN0ZWFkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgLSB1c2UgYHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBCb29sZWFuYCBpbnN0ZWFkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEJvb2xlYW47XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAtIHVzZSBgdmFsdWUgPT09IG51bGxgIGluc3RlYWQuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqIEBkZXByZWNhdGVkIC0gdXNlIGB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkYCBpbnN0ZWFkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgLSB1c2UgYHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcmAgaW5zdGVhZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiIHx8IHZhbHVlIGluc3RhbmNlb2YgTnVtYmVyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgLSB1c2UgYHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZ2AgaW5zdGVhZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgLSB1c2UgYHR5cGVvZiB2YWx1ZSA9PT0gXCJzeW1ib2xcImAgaW5zdGVhZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN5bWJvbFwiO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgLSB1c2UgYHZhbHVlID09PSB1bmRlZmluZWRgIGluc3RlYWQuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAtIHVzZSBgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiYCBpbnN0ZWFkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAtIHVzZSBgZSBpbnN0YW5jZW9mIEVycm9yYCBpbnN0ZWFkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRXJyb3IoZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gZSBpbnN0YW5jZW9mIEVycm9yO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgLSB1c2UgYHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiYCBpbnN0ZWFkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgVXNlIHV0aWwudHlwZXMuUmVnRXhwKCkgaW5zdGVhZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZ0V4cCh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZXMuaXNSZWdFeHAodmFsdWUpO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgVXNlIHV0aWwudHlwZXMuaXNEYXRlKCkgaW5zdGVhZC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVzLmlzRGF0ZSh2YWx1ZSk7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAtIHVzZSBgdmFsdWUgPT09IG51bGwgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIilgIGluc3RlYWQuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSA9PT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKVxuICApO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgIFVzZSBCdWZmZXIuaXNCdWZmZXIoKSBpbnN0ZWFkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQnVmZmVyKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB7XG4gIHJldHVybiBCdWZmZXIuaXNCdWZmZXIodmFsdWUpO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgVXNlIE9iamVjdC5hc3NpZ24oKSBpbnN0ZWFkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9leHRlbmQoXG4gIHRhcmdldDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gIHNvdXJjZTogdW5rbm93bixcbik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgc291cmNlIGlzbid0IGFuIG9iamVjdFxuICBpZiAoc291cmNlID09PSBudWxsIHx8IHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIpIHJldHVybiB0YXJnZXQ7XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSEpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdGFyZ2V0W2tleXNbaV1dID0gKHNvdXJjZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgc3lzdGVtIGVycm9yIG5hbWUgZnJvbSBhbiBlcnJvciBjb2RlIG51bWJlci5cbiAqIEBwYXJhbSBjb2RlIGVycm9yIGNvZGUgbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTeXN0ZW1FcnJvck5hbWUoY29kZTogbnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgaWYgKHR5cGVvZiBjb2RlICE9PSBcIm51bWJlclwiKSB7XG4gICAgdGhyb3cgbmV3IGNvZGVzLkVSUl9JTlZBTElEX0FSR19UWVBFKFwiZXJyXCIsIFwibnVtYmVyXCIsIGNvZGUpO1xuICB9XG4gIGlmIChjb2RlID49IDAgfHwgIU51bWJlcklzU2FmZUludGVnZXIoY29kZSkpIHtcbiAgICB0aHJvdyBuZXcgY29kZXMuRVJSX09VVF9PRl9SQU5HRShcImVyclwiLCBcImEgbmVnYXRpdmUgaW50ZWdlclwiLCBjb2RlKTtcbiAgfVxuICByZXR1cm4gZXJyb3JNYXAuZ2V0KGNvZGUpPy5bMF07XG59XG5cbi8qKlxuICogaHR0cHM6Ly9ub2RlanMub3JnL2FwaS91dGlsLmh0bWwjdXRpbF91dGlsX2luaGVyaXRzX2NvbnN0cnVjdG9yX3N1cGVyY29uc3RydWN0b3JcbiAqIEBwYXJhbSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlIHByb3RvdHlwZS5cbiAqIEBwYXJhbSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaGVyaXRzPFQsIFU+KFxuICBjdG9yOiBuZXcgKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gVCxcbiAgc3VwZXJDdG9yOiBuZXcgKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gVSxcbikge1xuICBpZiAoY3RvciA9PT0gdW5kZWZpbmVkIHx8IGN0b3IgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgY29kZXMuRVJSX0lOVkFMSURfQVJHX1RZUEUoXCJjdG9yXCIsIFwiRnVuY3Rpb25cIiwgY3Rvcik7XG4gIH1cblxuICBpZiAoc3VwZXJDdG9yID09PSB1bmRlZmluZWQgfHwgc3VwZXJDdG9yID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IGNvZGVzLkVSUl9JTlZBTElEX0FSR19UWVBFKFwic3VwZXJDdG9yXCIsIFwiRnVuY3Rpb25cIiwgc3VwZXJDdG9yKTtcbiAgfVxuXG4gIGlmIChzdXBlckN0b3IucHJvdG90eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgY29kZXMuRVJSX0lOVkFMSURfQVJHX1RZUEUoXG4gICAgICBcInN1cGVyQ3Rvci5wcm90b3R5cGVcIixcbiAgICAgIFwiT2JqZWN0XCIsXG4gICAgICBzdXBlckN0b3IucHJvdG90eXBlLFxuICAgICk7XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0b3IsIFwic3VwZXJfXCIsIHtcbiAgICB2YWx1ZTogc3VwZXJDdG9yLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSk7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihjdG9yLnByb3RvdHlwZSwgc3VwZXJDdG9yLnByb3RvdHlwZSk7XG59XG5cbmltcG9ydCB7IF9UZXh0RGVjb2RlciwgX1RleHRFbmNvZGVyIH0gZnJvbSBcIi4vX3V0aWxzLnRzXCI7XG5cbi8qKiBUaGUgZ2xvYmFsIFRleHREZWNvZGVyICovXG5leHBvcnQgdHlwZSBUZXh0RGVjb2RlciA9IGltcG9ydChcIi4vX3V0aWxzLnRzXCIpLl9UZXh0RGVjb2RlcjtcbmV4cG9ydCBjb25zdCBUZXh0RGVjb2RlciA9IF9UZXh0RGVjb2RlcjtcblxuLyoqIFRoZSBnbG9iYWwgVGV4dEVuY29kZXIgKi9cbmV4cG9ydCB0eXBlIFRleHRFbmNvZGVyID0gaW1wb3J0KFwiLi9fdXRpbHMudHNcIikuX1RleHRFbmNvZGVyO1xuZXhwb3J0IGNvbnN0IFRleHRFbmNvZGVyID0gX1RleHRFbmNvZGVyO1xuXG5mdW5jdGlvbiBwYWQobjogbnVtYmVyKSB7XG4gIHJldHVybiBuLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xufVxuXG5jb25zdCBtb250aHMgPSBbXG4gIFwiSmFuXCIsXG4gIFwiRmViXCIsXG4gIFwiTWFyXCIsXG4gIFwiQXByXCIsXG4gIFwiTWF5XCIsXG4gIFwiSnVuXCIsXG4gIFwiSnVsXCIsXG4gIFwiQXVnXCIsXG4gIFwiU2VwXCIsXG4gIFwiT2N0XCIsXG4gIFwiTm92XCIsXG4gIFwiRGVjXCIsXG5dO1xuXG4vKipcbiAqIEByZXR1cm5zIDI2IEZlYiAxNjoxOTozNFxuICovXG5mdW5jdGlvbiB0aW1lc3RhbXAoKTogc3RyaW5nIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IHQgPSBbXG4gICAgcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICBwYWQoZC5nZXRTZWNvbmRzKCkpLFxuICBdLmpvaW4oXCI6XCIpO1xuICByZXR1cm4gYCR7KGQuZ2V0RGF0ZSgpKX0gJHttb250aHNbKGQpLmdldE1vbnRoKCldfSAke3R9YDtcbn1cblxuLyoqXG4gKiBMb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG4gKiBAZGVwcmVjYXRlZFxuICovXG4vLyBkZW5vLWxpbnQtaWdub3JlIG5vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gbG9nKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gIGNvbnNvbGUubG9nKFwiJXMgLSAlc1wiLCB0aW1lc3RhbXAoKSwgZm9ybWF0KC4uLmFyZ3MpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBmb3JtYXQsXG4gIGZvcm1hdFdpdGhPcHRpb25zLFxuICBpbnNwZWN0LFxuICBpc0FycmF5LFxuICBpc0Jvb2xlYW4sXG4gIGlzTnVsbCxcbiAgaXNOdWxsT3JVbmRlZmluZWQsXG4gIGlzTnVtYmVyLFxuICBpc1N0cmluZyxcbiAgaXNTeW1ib2wsXG4gIGlzVW5kZWZpbmVkLFxuICBpc09iamVjdCxcbiAgaXNFcnJvcixcbiAgaXNGdW5jdGlvbixcbiAgaXNSZWdFeHAsXG4gIGlzRGF0ZSxcbiAgaXNQcmltaXRpdmUsXG4gIGlzQnVmZmVyLFxuICBfZXh0ZW5kLFxuICBnZXRTeXN0ZW1FcnJvck5hbWUsXG4gIGRlcHJlY2F0ZSxcbiAgY2FsbGJhY2tpZnksXG4gIHByb21pc2lmeSxcbiAgaW5oZXJpdHMsXG4gIHR5cGVzLFxuICBzdHJpcFZUQ29udHJvbENoYXJhY3RlcnMsXG4gIFRleHREZWNvZGVyLFxuICBUZXh0RW5jb2RlcixcbiAgbG9nLFxuICBkZWJ1Z2xvZyxcbiAgaXNEZWVwU3RyaWN0RXF1YWwsXG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxTQUFTLFNBQVMsUUFBUSxzQkFBc0I7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