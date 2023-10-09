export const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

export const stringToRoute = (str: string) => {
  return removeAccents(str)
    .toLowerCase()
    .replaceAll(',', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll('’', '')
    .replaceAll(' –', '')
    .replaceAll(' ', '-')
}
