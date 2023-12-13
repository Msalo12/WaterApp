/**
 * An object containing color constants used in the application.
 * Each key represents a specific color name, and the value is the corresponding color code.
 */
const COLOR = {
  black: '#000000', // The color code for black.
  cardBackground: '#FFFFFF', // The color code for card backgrounds.
  tabbarBackground: '#FFFFFF', // The color code for tab bar backgrounds.
  background: '#f6f6f6', // The color code for the overall background.
  tabbarIcon: '#ACACAC', // The color code for tab bar icons.
  darkgrey: '#707070', // The color code for grey.
  text: '#000000', // The color code for text.
  accent: '#2291F2', // The color code for accent color.
  friendly: '#41BE46', // The color code for friendly or positive color.
  secondary: '#FFC736', // The color code for secondary color.
  red: '#FF2C32', // The color code for red color.
  white: '#FFFFFF',
  lightgrey: '#E1E1E1',
  grey: '#999999'
};

/**
* An object containing font family constants used in the application.
* Each key represents a specific font family name, and the value is the corresponding font family.
*/
const FONT = {
  regular: "Montserrat-Medium", // The font family name for regular text.
  medium: "Montserrat-SemiBold", // The font family name for medium-weight text.
  title: "SF-Pro-Display-Black", // The font family name for titles or headings.
};

// Export the COLOR and FONT objects so that they can be used in other modules.
export { COLOR, FONT };