export const session = () => {
    const profileId = window.localStorage.getItem('profileId')       
    let loggedIn = false
  
    if (profileId) {
      loggedIn = true
    }
  
    return loggedIn
}


