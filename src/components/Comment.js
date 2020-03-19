import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import moment from 'moment'
import parse from 'html-react-parser'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  noDeco: {
    textDecoration: 'none !important',
  },
  authorLink: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    fontWeight: 800,
  },
  ts: {
    color: theme.palette.text.hint,
  },
  avatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  text: {
    marginTop: theme.spacing(1),
    lineHeight: '22px',
    fontSize: 15,
    '& p': { margin: 0, padding: 0 },
    '& blockquote': {
      margin: '12px 0',
      padding: '0 12px',
      display: 'block',
      borderLeft: '2px solid ' + theme.palette.primary.light,
      color: fade(theme.palette.text.primary, 0.8),
      fontStyle: 'italic'
    }
  }
}))

const Comment = ({ data }) => {
  const classes = useStyles()
  const { avatarUrl, login } = data.author
  const { message } = data
  const ts = moment(data.timePublished).fromNow()
  
  return (
    <Box className={classes.root} style={{ marginLeft: 16 * data.level }}>
      {/* Top bar */}
      <Grid alignItems="center" container direction="row">
        <Avatar src={avatarUrl} className={classes.avatar} />
        <Typography variant="caption">
          <Link
            className={classes.noDeco + ' ' + classes.authorLink}
            to={'/user/' + login}
          >
            {login}
          </Link>
        </Typography>
        <Typography className={classes.ts} variant="caption">
          {ts} | ID: {data.id} | Parent: {data.parentId}
        </Typography>
      </Grid>

      {/* Message */}
      <div className={classes.text}>{parse(message)}</div>
    </Box>
  )
}

export default Comment
