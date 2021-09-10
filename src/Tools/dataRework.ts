// uppercase first lettre not && return a txt with ... if too long
export const elipsMyText = (txt: string): string | undefined => {
  let txtTransform = ''
  if (txt) {
    txtTransform = txt.toLowerCase()
    // Uppercase la première lettre & ajoute une espace
    txtTransform = `${txtTransform.charAt(0).toUpperCase()}${txtTransform.slice(
      1,
    )} `

    // Coupe au premier espace a partir de 25 caractère et ajoute "..."
    txtTransform =
      txtTransform.length > 15
        ? `${txtTransform.slice(0, txtTransform.indexOf('-', 15))}....`
        : txtTransform
  }
  return txtTransform
}

export const dataForAssetsTable = (data) => {
  return data.map((elem, i) => {
    return {
      id: i,
      title: elem.title,
      createdAt: elem.createdAt,
    }
  })
}
