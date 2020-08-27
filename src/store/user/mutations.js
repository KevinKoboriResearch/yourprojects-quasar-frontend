import axios from 'axios'

export function setUser (state, user) {
  state.user = user
  if (user) {
    axios.defaults.headers.common.Authorization = `bearer ${user.token}`
    state.isMenuVisible = true
  } else {
    delete axios.defaults.headers.common.Authorization
    state.isMenuVisible = false
  }
}
