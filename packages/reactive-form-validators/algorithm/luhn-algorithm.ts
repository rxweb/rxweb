export function calculate(numbers: string) {
    let numberSum = 0;
    for (var i = 0; i < numbers.length; i++) numberSum += parseInt(numbers.substring(i, i + 1));

    let deltas = new Array(0, 1, 2, 3, 4, -4, -3, -2, -1, 0);
    for (var i = numbers.length - 1; i >= 0; i -= 2) {
        numberSum += deltas[parseInt(numbers.substring(i, i + 1))];
    }

    let mod = numberSum % 10;
    mod = 10 - mod;
    if (mod == 10)
        mod = 0;
    return mod;
}