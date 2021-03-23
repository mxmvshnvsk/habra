import React from 'react'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Grid,
} from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Hub } from 'src/interfaces'
import FlashOnRoundedIcon from '@material-ui/icons/FlashOnRounded'
import GroupRoundedIcon from '@material-ui/icons/GroupRounded'
import FormattedText from 'src/components/formatters/FormattedText'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import formatNumber from 'src/utils/formatNumber'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: 'none',
    '-webkit-tap-highlight-color': 'transparent !important',
  },
  primaryText: {
    color: theme.palette.text.primary,
    '& .searched-item': {
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
  },
  statistics: {
    marginTop: theme.spacing(0.5),
  },
  statisticsItem: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 156,
    color: theme.palette.text.hint,
  },
  statisticsItemIcon: {
    color: fade(theme.palette.text.primary, 0.62),
  },
  statisticsItemText: {
    marginLeft: theme.spacing(1),
  },
  title: theme.typography.body2
}))

const Item = ({ data }: { data: Hub }) => {
  const classes = useStyles()
  const statistics = [
    {
      value: data.statistics.rating,
      icon: FlashOnRoundedIcon,
      colored: true,
    },
    {
      value: data.statistics.subscribersCount,
      icon: GroupRoundedIcon,
    },
  ]

  const StatisticsItemText = ({ text }) => (
    <Typography
      component="span"
      variant="body2"
      className={classes.statisticsItemText}
    >
      {text}
    </Typography>
  )

  return (
    <ListItem
      dense
      button
      className={classes.root}
      component={LinkToOutsidePage}
      to={'/hub/' + data.alias + '/p/1'}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar src={data.imageUrl} alt={data.titleHtml} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ className: classes.primaryText }}
        disableTypography
        primary={
          <FormattedText className={classes.title}>
            {data.titleHtml}
          </FormattedText>
        }
        secondary={
          <>
            <Typography variant="body2" color="textSecondary">
              {data.descriptionHtml}
            </Typography>
            <Grid container className={classes.statistics}>
              {statistics.map((e, i) => (
                <Grid item xs={6} key={i} className={classes.statisticsItem}>
                  <e.icon className={classes.statisticsItemIcon} />
                  {e.colored && (
                    <GreenRedNumber number={e.value}>
                      <StatisticsItemText text={e.value} />
                    </GreenRedNumber>
                  )}
                  {!e.colored && (
                    <StatisticsItemText text={formatNumber(e.value)} />
                  )}
                </Grid>
              ))}
            </Grid>
          </>
        }
      />
    </ListItem>
  )
}

export default React.memo(Item)
