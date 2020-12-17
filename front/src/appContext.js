import React from "react";

export const AppContext = React.createContext({
    lang: 'uk',
    token: '',
    setToken: (jwt) => {},
    setLang: (lang) => {}
});