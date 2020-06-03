
export function isObject(value: any): boolean {
    return !!value && typeof value === 'object';
}

export function isEqual(first: any, second: any): boolean {
    return Object.entries(first).every(
        ([key, value]) => (isObject(value) ? isEqual(second[key], value) : second[key] === value)
    )
}
