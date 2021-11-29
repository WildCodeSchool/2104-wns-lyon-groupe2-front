export const months = [
  'Jan',
  'Fev',
  'Mar',
  'Avr',
  'Mai',
  'Jui',
  'Jul',
  'Aout',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// To get the date => 4 Oct 2021
export const dateTransformator = (d: any): string => {
  const day = d.getDate()
  const m = d.getMonth()
  const year = d.getFullYear()
  return `${day} ${months[m]} ${year}`
}
