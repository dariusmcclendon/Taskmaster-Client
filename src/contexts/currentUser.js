import React, { createContext, useState, useEffect } from "react";

//CurrentUser contexts provides currently logged in user to persist session
export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(undefined)
    
    useEffect(() => {
        //logging
        let getLoggedInUser = async ()=>{
            console.log('fetching user')
            let response = await fetch(`https://taskmaster-io-api.herokuapp.com/auth/profile`, {
                credentials: 'include'
            })
            let data = await response.json()
            if(response.status === 404){
                console.log(data)
                setCurrentUser(undefined)
            } else if(response.status === 200){
                setCurrentUser(data)
            }
 
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