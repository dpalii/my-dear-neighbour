import React from "react";

export const AppContext = React.createContext({
    lang: 'en',
    token: '',
    setToken: (jwt) => {},
    setLang: (lang) => {}
});