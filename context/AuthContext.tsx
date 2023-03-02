import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../config/firebase'
//context is used to see 'globally' what the current user is across all pages/components
const AuthContext = createContext<any>({})
//check what the context is ^
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<any>(null)
  //prevent the children of the AuthContextProvider component from rendering until the onAuthStateChanged Firebase listener has finished executing. This ensures that the user state variable is correctly initialized before any child components attempt to use it.
  const [loading, setLoading] = useState(true)
  console.log(user)

  // check the current authentication state (constantly) when the app loads and updates the user object and loading status accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          //displayName: user.displayName, <- no need for this
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    //only do this after user is fully null, else signout may bug
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {/* basically if its still loading stuff show nothing, else show children */}
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
