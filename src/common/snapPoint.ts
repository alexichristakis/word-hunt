export const snapPoint = (
  value: number,
  velocity: number,
  points: ReadonlyArray<number>
): number => {
  const point = value + 0.2 * velocity;
  const deltas = points.map((p) => Math.abs(point - p));
  const minDelta = Math.min(...deltas);
  return points.find((p) => Math.abs(point - p) === minDelta) ?? points[0];
};
