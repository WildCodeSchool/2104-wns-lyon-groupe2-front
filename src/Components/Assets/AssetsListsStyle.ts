import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '100%',
    marginTop: '100px',
  },
  assetsRow: {
    margin: '15px 5px',
    borderBottom: 'solid 1px',
  },
  assetIcons: {
    margin: '10px',
  },
  assetText: { fontSize: 25, color: 'grey', borderBottom: '1px solid' },
  test: { border: 'solid' },
}))

export default useStyles
