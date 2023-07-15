import { useEffect, useState } from "react";

export interface AuthData {
    access_token?: string;
    expires_in?: number;
    token_type?: string;
    refresh_token?: string;
}

export enum AUTH_ITEM_NAME {
    DULLAHAN_ACCESS_TOKEN = "DULLAHAN_ACCESS_TOKEN",
    DULLAHAN_EXPIRES_IN = "DULLAHAN_EXPIRES_IN",
    DULLAHAN_TOKEN_TYPE = "DULLAHAN_TOKEN_TYPE",
    DULLAHAN_REFRESH_TOKEN = "DULLAHAN_REFRESH_TOKEN"
}



function useAuth() {
    const [authItem, setAuthItem] = useState<AuthData>();

    const getItem = (itemName: AUTH_ITEM_NAME) => {
        const value = localStorage.getItem(itemName);
        if (!value) {
            throw new Error("Local variable is invalid!");
        }
        return value;
    }

    const setItem = (itemName: AUTH_ITEM_NAME, value: string) => {
        localStorage.setItem(itemName, value);
    }

    const clearItem = (itemName: AUTH_ITEM_NAME) => {
        localStorage.removeItem(itemName);
    }
    
    const getAccessToken = (): string => {
        return getItem(AUTH_ITEM_NAME.DULLAHAN_ACCESS_TOKEN);
    }

    const getExpiresIn = (): number => {
        const expiresIn = getItem(AUTH_ITEM_NAME.DULLAHAN_EXPIRES_IN);
        return +expiresIn;
    }

    const getTokenType = (): string => {
        return getItem(AUTH_ITEM_NAME.DULLAHAN_TOKEN_TYPE);
    }

    const getRefreshToken = (): string => {
        return getItem(AUTH_ITEM_NAME.DULLAHAN_REFRESH_TOKEN);
    }

    const setAuth = (auth: AuthData) => {
        if (!auth.access_token || !auth.expires_in || !auth.refresh_token || !auth.token_type) {
            throw new Error("Cannot set local variable!");
        }
        setItem(AUTH_ITEM_NAME.DULLAHAN_ACCESS_TOKEN, auth.access_token);
        setItem(AUTH_ITEM_NAME.DULLAHAN_EXPIRES_IN, auth.expires_in.toString());
        setItem(AUTH_ITEM_NAME.DULLAHAN_TOKEN_TYPE, auth.token_type);
        setItem(AUTH_ITEM_NAME.DULLAHAN_REFRESH_TOKEN, auth.refresh_token);
        setAuthItem(auth);
    }

    const updateAuth = (auth: AuthData) => {
        let item = authItem;
        if (auth.access_token) {
            setItem(AUTH_ITEM_NAME.DULLAHAN_ACCESS_TOKEN, auth.access_token);
            item = {...item, access_token: auth.access_token};
        }
        if (auth.expires_in) {
            setItem(AUTH_ITEM_NAME.DULLAHAN_EXPIRES_IN, auth.expires_in.toString());
            item = {...item, expires_in: auth.expires_in};
        }
        if (auth.token_type) {
            setItem(AUTH_ITEM_NAME.DULLAHAN_TOKEN_TYPE, auth.token_type);
            item = {...item, token_type: auth.token_type};
        }
        if (auth.refresh_token) {
            setItem(AUTH_ITEM_NAME.DULLAHAN_REFRESH_TOKEN, auth.refresh_token);
            item = {...item, refresh_token: auth.refresh_token};
        }
        setAuthItem(item);
    }

    const clearAuth = () => {
        clearItem(AUTH_ITEM_NAME.DULLAHAN_ACCESS_TOKEN);
        clearItem(AUTH_ITEM_NAME.DULLAHAN_EXPIRES_IN);
        clearItem(AUTH_ITEM_NAME.DULLAHAN_TOKEN_TYPE);
        clearItem(AUTH_ITEM_NAME.DULLAHAN_REFRESH_TOKEN);
        setAuthItem(undefined);
    }

    useEffect(() => {
        if (!authItem) {
            try {
                const accessToken = getAccessToken();
                const refreshToken = getRefreshToken();
                const tokenType = getTokenType();
                const expiresIn = getExpiresIn();
                setAuthItem({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    token_type: tokenType,
                    expires_in: expiresIn
                });
            } catch (e) {
                
            }
        }
    },[]);

    return {
        authData: authItem,
        getAccessToken,
        getExpiresIn,
        getRefreshToken,
        getTokenType,
        setAuth,
        updateAuth,
        clearAuth
    };
}

export default useAuth;