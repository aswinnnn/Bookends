import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../ThemeContext";

const Header = () => {
    const {themeMode} = useTheme();
    // This is a custom window decoration for the Tauri application
    return (
        <>
            <div data-tauri-drag-region className={`titlebar glass-blur ${
                themeMode === "dark" ? "bg-bookends-dark-accent" : "bg-bookends-accent"
            }`}>
                <BookOpenIcon color="#fff" className="h-5 w-5 self-center fixed left-[6px] pointer-events-none" />
                <div className="titlebar-button" id="titlebar-minimize" onClick={(_) => window.__TAURI__.window.getCurrentWindow().minimize()}>
                    <img
                        className="hover:shadow-md hover:animate-pulse rounded-full"
                        src="/src/assets/minimize.svg"
                        alt="minimize"
                    />
                </div>
                <div className="titlebar-button" id="titlebar-maximize" onClick={(_) => window.__TAURI__.window.getCurrentWindow().maximize()}>
                    <img
                        className="hover:shadow-md hover:animate-pulse rounded-full"
                        src="/src/assets/maximize.svg"
                        alt="maximize"
                    />
                </div>
                <div className="titlebar-button" id="titlebar-close" onClick={(_) => window.__TAURI__.window.getCurrentWindow().close()}>
                    <img className="hover:shadow-md hover:animate-pulse rounded-full" src="/src/assets/close.svg" alt="close" />
                </div>
                <span className="ml-[4px]"></span>
            </div>
        </>
    )
}

export default Header;