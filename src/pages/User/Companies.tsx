import React, { useEffect } from 'react'
import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'
import { Company } from 'src/interfaces'
import { useSelector } from 'src/hooks'
import ProfileCompaniesSkeleton from 'src/components/skeletons/ProfileCompanies'
import { useDispatch } from 'react-redux'
import { getProfileCompanies } from 'src/store/actions/profile'
import UserAvatar from 'src/components/blocks/UserAvatar'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginTop: theme.spacing(2),
  },
}))

const Companies = ({ classes: additionalClasses }: ComponentWithUserParams) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const profile = useSelector((store) => store.profile.profile.card.data)
  const companies = useSelector((store) => store.profile.profile.companies.data)
  const isFetched = useSelector(
    (store) => store.profile.profile.companies.fetched
  )
  const isFetching = useSelector(
    (store) => store.profile.profile.companies.fetching
  )
  const fetchError = useSelector(
    (store) => store.profile.profile.companies.error
  )

  useEffect(() => {
    dispatch(getProfileCompanies(profile.alias))
  }, [profile.alias, dispatch])

  const Item = ({ data }: { data: Company }) => (
    <ListItem
      style={{ paddingLeft: 0, paddingRight: 0 }}
      component={LinkToOutsidePage}
      to={'/company/' + data.alias}
    >
      <ListItemAvatar>
        <UserAvatar
          className={classes.avatar}
          src={data.imageUrl}
          alias={data.alias}
        />
      </ListItemAvatar>
      <ListItemText
        style={{ margin: 0 }}
        primaryTypographyProps={{ color: 'textPrimary' }}
        primary={data.titleHtml}
        secondary={data.descriptionHtml || 'Компания'}
      />
    </ListItem>
  )

  if (fetchError)
    return (
      <Typography className={classes.errorText}>
        Не удалось загрузить список любимых компаний
      </Typography>
    )
  if (isFetching) return <ProfileCompaniesSkeleton />

  return isFetched && companies && companies.companyIds.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>
        Подписан на компании
      </Typography>
      {companies.companyIds.map((e, i) => (
        <Item data={companies.companyRefs[e]} key={i} />
      ))}
    </div>
  ) : null
}

export default React.memo(Companies)
