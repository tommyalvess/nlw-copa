import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthSession from 'expo-auth-session'
import * as webBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google'
import { api } from "../serveces/api";
import { COLLECTION_TOKEN, COLLECTION_USERS } from "../serveces/storege";


webBrowser.maybeCompleteAuthSession()

interface UserProps {
    name: string
    avatarUrl: string
}

interface AuthContextProviderProps {
    children: ReactNode
}

export interface AuthContextDataProps {
    user: UserProps
    isUserLoading: boolean
    signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps)

//ele permite que compartilhe com todo nosso projeto 
export function AuthContextProvider({children} : AuthContextProviderProps) {

    const [isUserLoading,setUserLoading] = useState(false)
    const [user,setUser] = useState({} as UserProps)

    const [req, res, promptAsync] = Google.useAuthRequest({
        clientId: process.env.CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile','email']
    })    

    async function signIn() {
        try {
            setUserLoading(true)

            await promptAsync() 
        } catch (error) {
            console.log(error);
            throw error
            
        } finally {
            setUserLoading(false)
        }
    }

    async function signInGoogle(access_token:string) {
        try {
            
            setUserLoading(true)

            const tokenResponse = await api.post('/users', {access_token})  
            
            const token:string = tokenResponse.data

            const tokenFormated: string = token.replace('token: ','')           

            api.defaults.headers.common['Authorization'] = `Bearer ${tokenFormated}`

            const userInfoResponse = await api.get('/me')

            setUser(userInfoResponse.data.user)

            await AsyncStorage.setItem(COLLECTION_TOKEN, JSON.stringify(access_token))

        } catch (error) {
            console.log(error);
            throw error
        } finally {
            setUserLoading(false)
        }
    }

    async function checkUserIsLogged() {
        const access_token: any = await AsyncStorage.getItem(COLLECTION_TOKEN)

        if (access_token) {
            const tokenResponse = await api.post('/users', {access_token})  
            
            const token:string = tokenResponse.data

            const tokenFormated: string = token.replace('token: ','')           

            api.defaults.headers.common['Authorization'] = `Bearer ${tokenFormated}`

            const userInfoResponse = await api.get('/me')

            setUser(userInfoResponse.data.user)
            return;
        }

        if (res?.type === 'success' && res.authentication?.accessToken) {
            signInGoogle(res.authentication.accessToken)
        }
    }

    useEffect(() => {
        checkUserIsLogged()
    },[res])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                isUserLoading,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}