import React from 'react'; // Importe o React
import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="App">
            <div>{t("Olá mundo")}</div>
            <div>
                <button onClick={() => changeLanguage("pt")}>PT</button>
                <button onClick={() => changeLanguage("en")}>EN</button>
            </div>
        </div>
    );
}

export default App;
