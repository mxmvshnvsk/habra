import { PROFILE_ARTICLES } from './types'
import getPostFirstImage from 'src/utils/getPostFirstImage'

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: {
    pages: {},
    pagesCount: null,
    lastUpdated: null,
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_ARTICLES + 'FETCH': {
      return { ...state, fetching: true, error: null, fetched: false }
    }

    case PROFILE_ARTICLES + 'FETCH_FULFILLED': {
      const { page, pagesCount, data } = payload

      for (const id in data.articleRefs) {
        data.articleRefs[id].postFirstImage = getPostFirstImage(
          data.articleRefs[id]
        )
      }

      state.data.pages[page] = {
        articleIds: data.articleIds,
        articleRefs: data.articleRefs,
        lastUpdated: Date.now(),
      }
      state.data.pagesCount = pagesCount

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case PROFILE_ARTICLES + 'FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    default:
      return state
  }
}
