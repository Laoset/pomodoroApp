export function getColorFromMode(mode: string) {
  const red = '#f54e4e';
  const green = '#4aec8c';
  const blue = '#7CB9E8';
  if (mode === 'work') {
    return red;
  } else if (mode === 'break') {
    return green;
  } else if (mode === 'longbreak') {
    return blue;
  }
}
