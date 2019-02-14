const logOrThrowError = (error: string | Error) => {
  if (typeof error === 'string') {
    error = new Error(error)
  }

  if (process.env.NODE_ENV !== 'production') {
    throw error
  }

  // tslint:disable-next-line:no-console
  console.error(error)
}

export default logOrThrowError
