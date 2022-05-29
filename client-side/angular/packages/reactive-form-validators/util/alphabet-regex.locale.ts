export const alphabet = {
    'danish': /^[A-ZÆØÅ]+$/i,
    'french': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
    'german': /^[A-ZÄÖÜß]+$/i,
    'spanish': /^[a-zñáéíóúü]+$/i,
    'russian': /^[А-ЯЁ]+$/i,

};

export const alphaWithWhitespace = {
    'danish': /^[A-ZÆØÅ\s]+$/i,
    'french': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]+$/i,
    'german': /^[A-ZÄÖÜß\s]+$/i,
    'spanish': /^[a-zñáéíóúü\s]+$/i,
    'russian': /^[А-ЯЁ\s]+$/i,

};

export const alphanumeric = {
    'danish': /^[0-9A-ZÆØÅ]+$/i,
    'french': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
    'german': /^[0-9A-ZÄÖÜß]+$/i,
    'spanish': /^[0-9a-zñáéíóúü]+$/i,
    'russian': /^[0-9А-ЯЁ]+$/i,
};

export const alphanumericWithWitespace = {
    'danish': /^[0-9A-ZÆØÅ\s]+$/i,
    'french': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]+$/i,
    'german': /^[0-9A-ZÄÖÜß\s]+$/i,
    'spanish': /^[0-9a-zñáéíóúü\s]+$/i,
    'russian': /^[0-9А-ЯЁ\s]+$/i,
};

