const logOrThrowError = (error: string | Error): void => {
  if (typeof error === 'string') {
    error = new Error(error)
  }

  // Guard against missing `process` global.
  if (
    typeof process !== 'object' ||
    typeof process.env !== 'object' ||
    process.env.NODE_ENV === 'production'
  ) {
    // tslint:disable-next-line:no-console
    console.error(error)
    return
  }

  throw error
}

export default logOrThrowError
