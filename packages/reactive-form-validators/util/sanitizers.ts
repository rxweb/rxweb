function isNotBlank(value) {
    return (value !== undefined && value !== null && value !== "");
}
export const SANITIZERS: { [key: string]: Function } = {

    trim:(value)=>{
        if (isNotBlank(value))
            if (typeof value === "string")
                return value.trim();
        return value;
    },

    ltrim:(value)=>{
        if (isNotBlank(value))
            if (typeof value === "string")
                return value.replace(/^\s+/g, '');
        return value;
    }
}