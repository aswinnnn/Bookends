import React, { useState } from 'react';

interface CustomizePopupProps {
  onClose: () => void;
}

const CustomizePopup: React.FC<CustomizePopupProps> = ({ onClose }) => {
  const [titleFont, setTitleFont] = useState('Arial');
  const [bodyFont, setBodyFont] = useState('Roboto');
  const [primaryColor, setPrimaryColor] = useState('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState('#f0f0f0');
  const [textColor, setTextColor] = useState('#000000');
  const [accentColor, setAccentColor] = useState('#0078d4');
  const [wallpaperImage, setWallpaperImage] = useState('');
  const [isWallpaperEnabled, setIsWallpaperEnabled] = useState(false);

  const handleSave = () => {
    console.log({
      titleFont,
      bodyFont,
      primaryColor,
      secondaryColor,
      textColor,
      accentColor,
      wallpaperImage,
      isWallpaperEnabled,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="glass-blur bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl shadow-lg p-6 w-[90%] max-w-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Customize Journal</h2>
        <div className="space-y-4">
          {/* Title Font */}
          <div>
            <label className="block text-sm text-white mb-1">Title Font</label>
            <input
              type="text"
              value={titleFont}
              onChange={(e) => setTitleFont(e.target.value)}
              className="w-full rounded-md bg-transparent border border-white/20 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* Body Font */}
          <div>
            <label className="block text-sm text-white mb-1">Body Font</label>
            <input
              type="text"
              value={bodyFont}
              onChange={(e) => setBodyFont(e.target.value)}
              className="w-full rounded-md bg-transparent border border-white/20 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white mb-1">Primary Color</label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Secondary Color</label>
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Accent Color</label>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>

          {/* Wallpaper */}
          <div>
            <label className="block text-sm text-white mb-1">Wallpaper Image Path/URL</label>
            <input
              type="text"
              value={wallpaperImage}
              onChange={(e) => setWallpaperImage(e.target.value)}
              className="w-full rounded-md bg-transparent border border-white/20 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={isWallpaperEnabled}
                onChange={(e) => setIsWallpaperEnabled(e.target.checked)}
                className="h-4 w-4"
              />
              <label className="text-sm text-white">Enable Wallpaper Image</label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizePopup;