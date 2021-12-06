import { IAssetsDetails } from '../Interfaces/Assets'

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

export const dataForAssetsTable = (data: any[]): any[] => {
  return data.map((elem, i) => {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: elem._id,
      title: elem.title,
      createdAt: new Date(+elem.createdAt).toLocaleDateString(),
      updatedAt: new Date(+elem.updatedAt).toLocaleDateString(),
      likes: elem.likes || 0,
      type: elem.type || 'Unknown',
      url: elem.url,
    }
  })
}
