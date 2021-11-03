import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import useStyles from './MailSentStyle'

type SomeComponentProps = RouteComponentProps

const MailSent: React.FC<SomeComponentProps> = (props: any) => {
  const { history } = props
  const classes = useStyles()

  const handleGoBack = () => {
    history.push('/')
  }

  return (
    <Container maxWidth="xs" className="mail_sent_pages_container">
      <div className={classes.paper}>
        <Card className={classes.root} variant="outlined">
          <Typography>Récupération de mot de passe</Typography>
          <CardContent>
            Merci de vérifier vos mails, un lien de ré-initialisation vous a été
            envoyé.
          </CardContent>

          <CardActions>
            <Button onClick={handleGoBack}>Retour</Button>
          </CardActions>
        </Card>
      </div>
    </Container>
  )
}

export default withRouter(MailSent)
