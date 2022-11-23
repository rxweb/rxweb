export function extract([start, end]) {
        const matcher = new RegExp(`${start}(.*?)${end}`, 'gm');
        const normalise = (str) => str.slice(start.length, end.length * -1);
        return function (str) {
            return str.match(matcher).map(normalise);
        }
    }