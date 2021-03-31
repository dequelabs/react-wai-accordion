/**
 * A trimmed-down version npmjs.org/classnames.
 */

const compileClassnames = (classes: Record<string, boolean>): string => {
  const classList: string[] = []
  for (const key in classes) {
    // istanbul ignore if
    if (!Object.prototype.hasOwnProperty.call(classes, key)) {
      continue
    }

    if (classes[key]) {
      classList.push(key.trim())
    }
  }

  return classList.join(' ')
}

export default compileClassnames
