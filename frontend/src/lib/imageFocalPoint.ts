type ImageWithFocalPoint = {
  focalX?: number | null;
  focalY?: number | null;
};

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const toPercentOrDefault = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? clampPercent(parsed) : fallback;
};

export const getImageObjectPosition = (
  image?: ImageWithFocalPoint | null,
  fallbackY = 20,
) => {
  const x = toPercentOrDefault(image?.focalX, 50);
  const y = toPercentOrDefault(image?.focalY, fallbackY);
  return `${x}% ${y}%`;
};
