const mix = (value: number, inputRange: number[], outputRange: number[]) => {
  if (inputRange.length !== outputRange.length) {
    throw new Error("inputRange and outputRange must be of the same length");
  }

  // Find the appropriate segment for interpolation/extrapolation
  let i = 0;
  while (i < inputRange.length - 1 && value > inputRange[i + 1]) {
    i++;
  }

  // Handle edge cases where value is outside the given ranges
  if (i === 0 && value < inputRange[0]) {
    // Value is before the first input range point
    return extrapolate(
      value,
      inputRange[0],
      inputRange[1],
      outputRange[0],
      outputRange[1]
    );
  } else if (
    i === inputRange.length - 1 &&
    value > inputRange[inputRange.length - 1]
  ) {
    // Value is after the last input range point
    return extrapolate(
      value,
      inputRange[i - 1],
      inputRange[i],
      outputRange[i - 1],
      outputRange[i]
    );
  } else {
    // Normal interpolation between i and i+1
    return interpolate(
      value,
      inputRange[i],
      inputRange[i + 1],
      outputRange[i],
      outputRange[i + 1]
    );
  }
};

function interpolate(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  // Linear interpolation
  const ratio = (value - inputMin) / (inputMax - inputMin);
  return outputMin + ratio * (outputMax - outputMin);
}

function extrapolate(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  // Linear extrapolation using the same formula as interpolation
  const ratio = (value - inputMin) / (inputMax - inputMin);
  return outputMin + ratio * (outputMax - outputMin);
}

export default mix;
