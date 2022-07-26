import React, { createContext, useState, useEffect } from "react";

//CurrentUser contexts provides currently logged in user to persist session
export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        //logging
        let getLoggedInUser = async ()=>{
            console.log('fetching user')
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/auth/profile`, {
                credentials: 'include'
            })
            let user = await response.json()
            console.log(user)
            setCurrentUser(user)
            //add the user object to localStorage
        }
        getLoggedInUser()
    }, [])

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider