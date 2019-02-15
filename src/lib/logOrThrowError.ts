const logOrThrowError = (error: string | Error) => {
  if (typeof error === 'string') {
    error = new Error(error)
  }

  // Guard against missing `process` global.
  const p = typeof process === 'object' ? process : null
  if (!p || typeof p.env !== 'object' || p.env.NODE_ENV === 'production') {
    // tslint:disable-next-line:no-console
    console.error(error)
  }

  throw error
}

export default logOrThrowError
