export function unCamelCase(value) {
    return value.replace(/([A-Z])/g, '$1')
        .replace(/^./, function(str) {
        return str.toUpperCase();
    })
}
