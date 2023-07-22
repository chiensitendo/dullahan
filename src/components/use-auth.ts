import { useEffect, useState } from "react";

export interface AuthData {
    access_token?: string;
    expires_in?: number;
    token_type?: string;
    refresh_token?: string;
    is_new?: boolean
}

export enum AUTH_ITEM_NAME {
    DULLAHAN_ACCESS_TOKEN = "DULLAHAN_ACCESS_TOKEN",
    DULLAHAN_EXPIRES_IN = "DULLAHAN_EXPIRES_IN",
    DULLAHAN_TOKEN_TYPE = "DULLAHAN_TOKEN_TYPE",
    DULLAHAN_REFRESH_TOKEN = "DULLAHAN_REFRESH_TOKEN",
    DULLAHAN_IS_NEW = "DULLAHAN_IS_NEW"
}

export enum AUTH_STATUS {
    INIT,
    TRUE,
    FALSE
}



function useAuth() {
    const [authItem, setAuthItem] = useState<AuthData>();
    const [authStatus, setAuthStatus] = useState<AUTH_STATUS>(AUTH_STATUS.INIT);

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

    const getIsNew = (): boolean => {
        const value = getItem(AUTH_ITEM_NAME.DULLAHAN_IS_NEW);
        return value === 'true';
    }

    const setIsNew = (value: boolean) => {
        setItem(AUTH_ITEM_NAME.DULLAHAN_IS_NEW, String(value));
    }

    const setAuth = (auth: AuthData) => {
        if (!auth.access_token || !auth.expires_in || !auth.refresh_token || !auth.token_type) {
            throw new Error("Cannot set local variable!");
        }
        setItem(AUTH_ITEM_NAME.DULLAHAN_ACCESS_TOKEN, auth.access_token);
        setItem(AUTH_ITEM_NAME.DULLAHAN_EXPIRES_IN, auth.expires_in.toString());
        setItem(AUTH_ITEM_NAME.DULLAHAN_TOKEN_TYPE, auth.token_type);
        setItem(AUTH_ITEM_NAME.DULLAHAN_REFRESH_TOKEN, auth.refresh_token);
        if (auth.is_new !== undefined) {
            setIsNew(auth.is_new);
        }
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
        clearItem(AUTH_ITEM_NAME.DULLAHAN_IS_NEW);
        setAuthItem(undefined);
    }

    useEffect(() => {
        setAuthStatus(AUTH_STATUS.FALSE);
        if (!authItem) {
            try {
                const accessToken = getAccessToken();
                const refreshToken = getRefreshToken();
                const tokenType = getTokenType();
                const expiresIn = getExpiresIn();
                const isNew = getIsNew();
                setAuthItem({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    token_type: tokenType,
                    expires_in: expiresIn,
                    is_new: isNew
                });
                setAuthStatus(AUTH_STATUS.TRUE);
            } catch (e) {
                setAuthStatus(AUTH_STATUS.FALSE);
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
        clearAuth,
        getIsNew,
        setIsNew,
        authStatus
    };
}

export default useAuth;