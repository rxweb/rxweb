import { encoder } from '../core/encoder'

export function routePath(path: string) {
        var splitText = path.split('/');
        var path = "";
        splitText.forEach(t => {
            let isParam = t.charAt(0) == ":";
            if (path == "" && isParam)
                path = t;
            else if (isParam)
                path += `/${t}`;
            else if (path === "")
                path += `${encoder.encode(t)}`
            else
                path += `/${encoder.encode(t)}`
        })
        return path;
}