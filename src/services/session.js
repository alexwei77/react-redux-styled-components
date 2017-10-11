export const session = () => {
    const profileId = window.localStorage.getItem('profileId')   
    console.log("profileId-session", profileId) 
    let loggedIn = false
  
    if (profileId) {
      loggedIn = true
    }
  
    return loggedIn
}


