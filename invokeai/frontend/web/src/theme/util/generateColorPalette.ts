import { InvokeAIPaletteSteps } from 'theme/themeTypes';

/**
 * Add two numbers together
 * @param  {String | Number} hue Hue of the color (0-360) - Reds 0, Greens 120, Blues 240
 * @param  {String | Number} saturation Saturation of the color (0-100)
 * @param  {boolean} light True to generate light color palette
 */
export function generateColorPalette(
  hue: string | number,
  saturation: string | number,
  light = false,
  alpha = false
) {
  hue = String(hue);
  saturation = String(saturation);

  const colorSteps = Array.from({ length: 21 }, (_, i) => i * 50);
  const lightnessSteps = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59, 64, 68, 73, 77, 82, 86,
    95, 100,
  ];

  const darkPalette: Partial<InvokeAIPaletteSteps> = {};
  const lightPalette: Partial<InvokeAIPaletteSteps> = {};

  colorSteps.forEach((colorStep, index) => {
    const A = alpha ? lightnessSteps[index] / 100 : 1;

    // Lightness should be 50% for alpha colors
    const darkPaletteLightness = alpha
      ? 50
      : lightnessSteps[colorSteps.length - 1 - index];

    darkPalette[
      colorStep as keyof typeof darkPalette
    ] = `hsl(${hue} ${saturation}% ${darkPaletteLightness}% / ${A})`;

    const lightPaletteLightness = alpha ? 50 : lightnessSteps[index];

    lightPalette[
      colorStep as keyof typeof lightPalette
    ] = `hsl(${hue} ${saturation}% ${lightPaletteLightness}% / ${A})`;
  });

  return light ? lightPalette : darkPalette;
}
