type Option = { value: string; label: string }

export const getInputOptions = (arr: string[]): Option[] =>
  arr.map((str) => ({ value: str, label: str }))
