const useNickname = (string: string | undefined): string | null => {
  if (string) {
    // eslint-disable-next-line no-unused-expressions
    const shortString =
      string.split(' ')[0].slice(0, 1).toUpperCase() +
      string.split(' ')[1].slice(0, 1).toUpperCase()

    return shortString
  }
  return null
}

export default useNickname
