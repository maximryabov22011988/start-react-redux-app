export default (ref, cssProperty) => {
  const computedStyle = window.getComputedStyle(ref);
  return computedStyle.getPropertyValue(cssProperty);
};
