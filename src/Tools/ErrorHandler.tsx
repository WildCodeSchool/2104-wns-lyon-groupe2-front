const errors = [
  { code: '100', message: 'Cet utilisateur existe déjà' },
  { code: '101', message: "L'email n'est pas valide" },
  {
    code: '102',
    message: 'Le nom saisi comprend des caractères non autorisés',
  },
  {
    code: '103',
    message: 'Le nom saisi doit comporter au moins un caractère',
  },
  {
    code: '104',
    message: "Vous devez indiquer le nom de l'utilisateur",
  },
  {
    code: '105',
    message: 'Le prénom saisi comprend des caractères non autorisés',
  },
  {
    code: '106',
    message: 'Le prénom saisi doit comporter au moins un caractère',
  },
  {
    code: '107',
    message: "Vous devez indiquer le prénom de l'utilisateur",
  },
]

export const returnMessageForAnErrorCode = (code: string): any => {
  const errorFound = errors.filter((error) => code === error.code)[0]
  if (errorFound) {
    return errorFound.message
  }
  return "Une erreur s'est produite"
}
