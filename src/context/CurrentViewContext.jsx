import { createContext, useState } from "react";

export const CurrentViewContext = createContext();

const CurrentViewProvider = ({ children }) => {
    const KEY_HOME_VIEW = "home";
    const [currentView, setCurrentView] = useState(KEY_HOME_VIEW);

    const changeView = (view) => {
        setCurrentView(view);
    }

    return (
        <CurrentViewContext.Provider value={{ currentView, changeView }} >
            {children}
        </CurrentViewContext.Provider>   
    );
}

export default CurrentViewProvider;