/**
 * A trimmed-down version npmjs.org/classnames.
 */

interface ClassNames {
  [s: string]: boolean;
}

const compileClassnames = (classes: ClassNames) => {
  const classList: string[] = [];
  for (const key in classes) {
    // istanbul ignore if
    if (!classes.hasOwnProperty(key)) {
      continue;
    }

    if (classes[key]) {
      classList.push(key.trim());
    }
  }

  return classList.join(' ');
};

export default compileClassnames;
