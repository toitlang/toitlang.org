/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const breakpointsRem = {
  tiny: 24, // 384px
  small: 50, // 800px
  medium: 64, // 1024px
  large: 75, // 1200px
  huge: 100, // 1600px
}

// To be used in your CSS like this:
//
//     width: linearClamp(small, large, 3, 6);
//
// This will create a linear interpolation between 3rem and 6rem inside the
// small and large breakpoints.
//
// You can also directly specify the rem values inside the function:
//
//     width: linearClamp(10, 40, 3, 6)
//
// This will interpolate between 3rem and 6rem for the breakpoints 10rem and
// 40rem.
const linearClamp = (minWidth, maxWidth, minSize, maxSize) => {
  minWidth = breakpointsRem[minWidth] ?? parseFloat(minWidth)
  maxWidth = breakpointsRem[maxWidth] ?? parseFloat(maxWidth)
  minSize = parseFloat(minSize)
  maxSize = parseFloat(maxSize)

  const slope = (maxSize - minSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minSize
  const preferredValue = `${yAxisIntersection}rem + ${slope * 100}vw`

  return `clamp(${minSize}rem, ${preferredValue}, ${maxSize}rem)`
}

module.exports = linearClamp
