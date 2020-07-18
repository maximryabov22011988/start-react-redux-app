export const getComputedStyleProperty = (ref, cssProperty) => {
  const computedStyle = window.getComputedStyle(ref);
  return computedStyle.getPropertyValue(cssProperty);
};
