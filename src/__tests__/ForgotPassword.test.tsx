import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'

import {
  ForgotPassword,
  GET_PASSWORD_BY_MAIL,
} from '../Pages/Password/ForgotPassword'

const mocks = [
  {
    request: {
      query: GET_PASSWORD_BY_MAIL,
      variables: {
        email: 'panda@panda.com',
      },
    },
    result: {
      data: {
        getMyPasswordBack: {
          id: 123,
        },
      },
    },
  },
]

describe('ForgotPassword Component', () => {
  it('should find a formContainer with a title', () => {
    render(
      <MockedProvider>
        <ForgotPassword />
      </MockedProvider>,
    )
    expect(screen.getByTestId('forgot_container')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Récupération de mot de passe',
      }),
    )
  })

  it('should find a form', () => {
    render(
      <MockedProvider>
        <ForgotPassword />
      </MockedProvider>,
    )
    expect(screen.getByTestId('forgot_form')).toBeInTheDocument()
  })
  it('should find an input with a button', () => {
    render(
      <MockedProvider>
        <ForgotPassword />
      </MockedProvider>,
    )
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('send_mail_button')).toBeInTheDocument()
  })
  it('user can writte on the email input', () => {
    render(
      <MockedProvider>
        <ForgotPassword />
      </MockedProvider>,
    )
    const emailInput = screen.getByTestId('email')
    userEvent.type(emailInput, 'a@a.com')
    expect(emailInput).toHaveValue('a@a.com')
  })
  // A voir ci-dessous pour le bon typage car pas trouver....
  it('user could send this e-mail', async () => {
    const onSubmit = jest.fn()
    const { getByTestId, findByText, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ForgotPassword onClick={onSubmit()} />
      </MockedProvider>,
    )

    const onSubmitBtn = getByTestId('send_mail_button')
    userEvent.click(onSubmitBtn)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    screen.debug()
  })
})

afterEach(cleanup)
