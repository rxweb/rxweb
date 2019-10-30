export const alphabet = {
    'danish': /^[A-ZÆØÅ]+$/,
    'french': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/,
    'german': /^[A-ZÄÖÜß]+$/,
    'greek': /^[Α-ω]+$/,
    'spanish': /^[A-ZÁÉÍÑÓÚÜ]+$/,
    'russian': /^[А-ЯЁ]+$/,

};

export const alphaWithWhitespace = {
    'danish': /^[A-ZÆØÅ\s]+$/,
    'french': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]+$/,
    'german': /^[A-ZÄÖÜß\s]+$/,
    'greek': /^[Α-ω\s]+$/,
    'spanish': /^[A-ZÁÉÍÑÓÚÜ\s]+$/,
    'russian': /^[А-ЯЁ\s]+$/,

};

export const alphanumeric = {
    'danish': /^[0-9A-ZÆØÅ]+$/,
    'french': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/,
    'german': /^[0-9A-ZÄÖÜß]+$/,
    'spanish': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/,
    'russian': /^[0-9А-ЯЁ]+$/,
};

export const alphanumericWithWitespace = {
    'danish': /^[0-9A-ZÆØÅ]+$/,
    'french': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/,
    'german': /^[0-9A-ZÄÖÜß]+$/,
    'spanish': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/,
    'russian': /^[0-9А-ЯЁ]+$/,
};

