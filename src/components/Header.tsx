const Header = () => {
// This is a custom window decoration for the Tauri application
    return (
        <>
            <div data-tauri-drag-region className="titlebar bg-lime-100">
                <div className="titlebar-button" id="titlebar-minimize" onClick={(_) => window.__TAURI__.window.getCurrentWindow().minimize()}>
                    <img
                        src="https://api.iconify.design/mdi:window-minimize.svg"
                        alt="minimize"
                    />
                </div>
                <div className="titlebar-button" id="titlebar-maximize" onClick={(_) => window.__TAURI__.window.getCurrentWindow().maximize()}>
                    <img
                        src="https://api.iconify.design/mdi:window-maximize.svg"
                        alt="maximize"
                    />
                </div>
                <div className="titlebar-button" id="titlebar-close" onClick={(_) => window.__TAURI__.window.getCurrentWindow().close()}>
                    <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
                </div>
            </div>
        </>
    )
}

export default Header;