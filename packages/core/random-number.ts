export class RandomNumber {
  static numberCount = 1;
  static next() {
    RandomNumber.numberCount = RandomNumber.numberCount + 1;
    return RandomNumber.numberCount;
  }
}
