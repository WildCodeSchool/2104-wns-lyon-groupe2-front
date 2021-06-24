import React from 'react'
import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  cleanup,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword'

describe('ForgotPassword Component', () => {
  it('should find a formContainer with a title', () => {
    render(<ForgotPassword />)
    expect(screen.getByTestId('forgot_container')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Récupération de mot de passe',
      }),
    )
  })

  it('should find a form', () => {
    render(<ForgotPassword />)
    expect(screen.getByTestId('forgot_form')).toBeInTheDocument()
  })
  it('should find an input with a button', () => {
    render(<ForgotPassword />)
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('send_mail_button')).toBeInTheDocument()
  })
  it('user can writte on the email input', () => {
    render(<ForgotPassword />)
    const emailInput = screen.getByTestId('email')
    userEvent.type(emailInput, 'a@a.com')
    expect(emailInput).toHaveValue('a@a.com')
  })
  it('user could send this e-mail', () => {
    const onSubmit = jest.fn()
    const { getByTestId } = render(<ForgotPassword onClick={onSubmit()} />)
    const onSubmitBtn = getByTestId('send_mail_button')
    userEvent.click(onSubmitBtn)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})

afterEach(cleanup)
