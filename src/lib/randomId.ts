const randomId = (prefix: string) =>
  prefix +
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10)

export default randomId
