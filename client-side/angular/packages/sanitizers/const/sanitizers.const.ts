function isNumeric(value: any) {
    return (value - parseFloat(value) + 1) >= 0;
}

function isNotBlank(value: any) {
    return (value !== undefined && value !== null && value !== "");
}

export const SANITIZERS: { [key: string]: Function } = {
    lowerCase: (value: any) => isNotBlank(value) ? value.toLowerCase() : null,
    upperCase: (value: any) => isNotBlank(value) ? value.toUpperCase() : null,
    trim: (value: any) => {
        if (isNotBlank(value))
            if (typeof value === "string")
                return value.trim();
        return value;
    },
    ltrim: (value: any) => {
        if (isNotBlank(value))
            if (typeof value === "string")
                return value.replace(/^\s+/g, '');
        return value;
    },

    rtrim: (value: any) => {
        if (isNotBlank(value))
            if (typeof value === "string")
                return value.replace(/\s+$/g, '');
        return value;
    },

    blacklist: (value: any, config:any) => {
        if (isNotBlank(value))
            if (typeof value === "string")
                return value.replace(new RegExp('[$' + config.chars + ']+', 'g'), '');
        return value;
    },

    stripLow: (value: any, config: any) => {
        let chars: String = config.keepNewLines === true ? '\x00-\x09\x0B\x0C\x0E-\x1F\x7F' : '\x00-\x1F\x7F';
        return SANITIZERS.blacklist(value, chars);
    },

    toBoolean: (value: any, config: any) => {
        if (isNotBlank(value)) {
            if (config.strict) {
                return value === '1' || value === 'true';
            }
            return value !== '0' && value !== 'false' && value !== '';
        }
        return value;
    },

    toFloat: (value: any) => {
        if (isNotBlank(value))
            if (isNumeric(value))
                return parseFloat(value)
        return null;
    },

    toDouble: (value: any) => {
        return SANITIZERS.toFloat(value)
    },

    toInt: (value: any,config: any) => {
        if (isNotBlank(value))
            if (isNumeric(value))
                return parseInt(value,config.radix || 10);
        return null;
    },

    toString: (value: any)=> {
        if (isNotBlank(value))
            return String(value);
        return value;
    },

    whitelist: (value: any,config: any)=> {
        if (isNotBlank(value))
            if (typeof value === "string")
                return value.replace(new RegExp(`[^${config.chars}]+`, 'g'), '');
        return value;
    },

    escape: (value: string) => {
        if (isNotBlank(value))
            return (value.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\//g, '&#x2F;')
                .replace(/\\/g, '&#x5C;')
                .replace(/`/g, '&#96;'));
        return value;
    },

    prefix: (value: any,config: any)=> {
        if (isNotBlank(value))
            return `${config.text}${value}`;
        return value;
    },

    suffix: (value: any, config: any)=> {
        if (isNotBlank(value))
            return `${value}${config.text}`;
        return value;
    },

    random: (config:any) => {
        if (!config)
            return Math.random();
        else {
            let min = Math.ceil(config.min);
            let max = Math.floor(config.max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
}