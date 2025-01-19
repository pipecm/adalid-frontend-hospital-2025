import { createContext, useState } from "react";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const KEY_HOME_VIEW = "home";
    const [currentView, setCurrentView] = useState(KEY_HOME_VIEW);

    const changeView = (view) => {
        setCurrentView(view);
    }

    return (
        <MenuContext.Provider value={{ currentView, changeView }} >
            {children}
        </MenuContext.Provider>   
    );
}

export default MenuProvider;