// ========================================
// SPARK — CSS VARIABLES ACCESS
// ========================================
// Programmatic access to design system variables
// Useful for JavaScript integrations and dynamic theming

// Get computed style from :root
const rootStyle = getComputedStyle(document.documentElement);

// Helper function to get CSS variable value
export function getCssVar(variable, fallback = '') {
  return rootStyle.getPropertyValue(variable).trim() || fallback;
}

// Helper function to set CSS variable value
export function setCssVar(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

// ========================================
// PALETTE SPARK
// ========================================
export const palette = {
  // Backgrounds
  bgPrimary: () => getCssVar('--bg-primary'),
  bgSecondary: () => getCssVar('--bg-secondary'),
  bgMuted: () => getCssVar('--bg-muted'),
  bgSubtle: () => getCssVar('--bg-subtle'),

  // Text
  textPrimary: () => getCssVar('--text-primary'),
  textSecondary: () => getCssVar('--text-secondary'),
  textMuted: () => getCssVar('--text-muted'),
  textSubtle: () => getCssVar('--text-subtle'),
  textInverse: () => getCssVar('--text-inverse'),

  // Borders
  borderPrimary: () => getCssVar('--border-primary'),
  borderSecondary: () => getCssVar('--border-secondary'),
  borderMuted: () => getCssVar('--border-muted'),
  borderBrand: () => getCssVar('--border-brand'),

  // Interactive
  interactivePrimary: () => getCssVar('--interactive-primary'),
  interactiveHover: () => getCssVar('--interactive-hover'),
  interactiveActive: () => getCssVar('--interactive-active'),
};

// ========================================
// LAYOUT SPARK
// ========================================
export const layout = {
  containerXs: () => getCssVar('--container-xs'),
  containerSm: () => getCssVar('--container-sm'),
  containerMd: () => getCssVar('--container-md'),
  containerLg: () => getCssVar('--container-lg'),
  containerFull: () => getCssVar('--container-full'),

  breakpointXs: () => getCssVar('--breakpoint-xs'),
  breakpointSm: () => getCssVar('--breakpoint-sm'),
  breakpointMd: () => getCssVar('--breakpoint-md'),
  breakpointLg: () => getCssVar('--breakpoint-lg'),
  breakpointXl: () => getCssVar('--breakpoint-xl'),
};

// ========================================
// TYPOGRAPHY SPARK
// ========================================
export const typography = {
  fontBase: () => getCssVar('--font-base'),
  fontAux: () => getCssVar('--font-aux'),
  fontMono: () => getCssVar('--font-mono'),

  textXs: () => getCssVar('--text-xs'),
  textSm: () => getCssVar('--text-sm'),
  textMd: () => getCssVar('--text-md'),
  textLg: () => getCssVar('--text-lg'),
  textXl: () => getCssVar('--text-xl'),
  textXxl: () => getCssVar('--text-xxl'),

  fontLight: () => getCssVar('--font-light'),
  fontRegular: () => getCssVar('--font-regular'),
  fontMedium: () => getCssVar('--font-medium'),
  fontBold: () => getCssVar('--font-bold'),
};

// ========================================
// SPACING SPARK
// ========================================
export const spacing = {
  paddingXs: () => getCssVar('--padding-xs'),
  paddingSm: () => getCssVar('--padding-sm'),
  paddingMd: () => getCssVar('--padding-md'),
  paddingLg: () => getCssVar('--padding-lg'),

  marginXs: () => getCssVar('--margin-xs'),
  marginSm: () => getCssVar('--margin-sm'),
  marginMd: () => getCssVar('--margin-md'),
  marginLg: () => getCssVar('--margin-lg'),

  gapXs: () => getCssVar('--gap-xs'),
  gapSm: () => getCssVar('--gap-sm'),
  gapMd: () => getCssVar('--gap-md'),
  gapLg: () => getCssVar('--gap-lg'),
};

// ========================================
// MOTION SPARK
// ========================================
export const motion = {
  durationFast: () => getCssVar('--duration-fast'),
  durationBase: () => getCssVar('--duration-base'),
  durationSlow: () => getCssVar('--duration-slow'),

  delayShort: () => getCssVar('--delay-short'),
  delayLong: () => getCssVar('--delay-long'),

  timingSmooth: () => getCssVar('--timing-smooth'),
  timingLinear: () => getCssVar('--timing-linear'),
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Apply theme programmatically
export function applyTheme(themeVars) {
  Object.entries(themeVars).forEach(([key, value]) => {
    setCssVar(key, value);
  });
}

// Get all design system variables as object
export function getAllVars() {
  const allVars = {};

  // Get all CSS variables from :root
  const rootVars = Array.from(rootStyle).filter(prop => prop.startsWith('--'));

  rootVars.forEach(varName => {
    allVars[varName] = getCssVar(varName);
  });

  return allVars;
}

// Export everything as default
export default {
  palette,
  layout,
  typography,
  spacing,
  motion,
  getCssVar,
  setCssVar,
  applyTheme,
  getAllVars,
};