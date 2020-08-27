export function toggleMenu (state, isVisible) {
  if (!state.user) {
    state.isMenuVisible = false
    return
  }

  if (isVisible === undefined) {
    state.isMenuVisible = !state.isMenuVisible
  } else {
    state.isMenuVisible = isVisible
  }
}
