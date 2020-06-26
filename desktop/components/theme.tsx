import React, { createContext, useState, useContext, ReactType } from "react"

type GlobalTheme = {
    backgroundPrimaryColor: string
    backgroundSecondaryColor: string
}

type UserTheme = {
    linkPrimaryColor: string
}

const defaultGlobalDarkTheme: GlobalTheme = {
    backgroundPrimaryColor: "#0B0D0F",
    backgroundSecondaryColor: "#383B42",
}

const defaultGlobalLightTheme: GlobalTheme = {
    backgroundPrimaryColor: "#FFFFFF",
    backgroundSecondaryColor: "#E1E3E6",
}

export const defaultUserTheme: UserTheme = {
    linkPrimaryColor: "",
}

const defaultGlobalThemes = {
    dark: defaultGlobalDarkTheme,
    light: defaultGlobalLightTheme,
    current: defaultGlobalLightTheme,
    setCurrentTheme: null,
}

type Themes = {
    global: {
        dark: GlobalTheme
        light: GlobalTheme
        current: GlobalTheme
        setCurrentTheme: (key: string) => any
    }
    user: UserTheme
}

const ThemeContext = createContext(null)

export const ThemeProvider = ({
    userTheme,
    defaultGlobalThemeName,
    children,
}) => {
    const [currentGlobalThemeName, setCurrentGlobalThemeName]: [
        string,
        (key: string) => any
    ] = useState(defaultGlobalThemeName)
    return (
        <ThemeContext.Provider
            value={{
                global: {
                    dark: defaultGlobalDarkTheme,
                    light: defaultGlobalLightTheme,
                    current: defaultGlobalThemes[currentGlobalThemeName],
                    setCurrentTheme: (key: string) => {
                        console.log("key", key)
                        if (key !== "dark" && key !== "light") {
                            return
                        }
                        setCurrentGlobalThemeName(key)
                    },
                },
                user: userTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): [Themes, (key: string) => any] => {
    const themes: Themes = useContext(ThemeContext)
    return [themes, themes.global.setCurrentTheme]
}