import React, { useState, useEffect } from "react";
import Sidepanel from "../Sidepanel";
import { SketchPicker } from "react-color";

interface SettingsProps {
  setSelected: React.Dispatch<React.SetStateAction<"home" | "create">>;
}

interface SettingsData {
  [key: string]: any;
}

const Settings: React.FC<SettingsProps> = ({ setSelected }) => {
  const [activeTab, setActiveTab] = useState<"general" | "appearance" | "privacy" | "misc">("general");
  const [settings, setSettings] = useState<SettingsData>({});
  const [themeColor, setThemeColor] = useState("#F9E0B2");

  // Load settings from settings.json
  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch("/src/settings.json");
      const data = await response.json();
      setSettings(data);
      setThemeColor(data.appearance?.themeColor || "#F9E0B2");
    };
    fetchSettings();
  }, []);

  // Save settings to settings.json
  const saveSettings = async (updatedSettings: SettingsData) => {
    setSettings(updatedSettings);
    console.log("Saving settings:", updatedSettings);
  };

  const handleColorChange = (color: any) => {
    setThemeColor(color.hex);
    const updatedSettings = { ...settings, appearance: { ...settings.appearance, themeColor: color.hex } };
    saveSettings(updatedSettings);
  };

  return (
    <>
      <Sidepanel setSelected={setSelected} />
      <div className="pt-[30px] min-h-screen bg-transparent backdrop-blur-md text-white dark:text-gray-300 flex flex-col items-center">
        <div className="w-full max-w-4xl px-6 py-12">
          {/* Tabs */}
          <div className="glass-blur bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl shadow-lg p-4 mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {["general", "appearance", "privacy", "miscellaneous"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-bookends-accent text-black"
                      : "bg-transparent text-white hover:bg-white/20 dark:hover:bg-black/20"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="glass-blur bg-gradient-to-br from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl shadow-lg p-6">
            {activeTab === "general" && (
              <div>
                <h2 className="text-2xl font-bold text-bookends-accent mb-4 text-center">General Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Enable Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.general?.notifications || false}
                      onChange={(e) =>
                        saveSettings({
                          ...settings,
                          general: { ...settings.general, notifications: e.target.checked },
                        })
                      }
                      className="h-5 w-5 accent-bookends-accent"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Auto-Save Journals</span>
                    <input
                      type="checkbox"
                      checked={settings.general?.autoSave || false}
                      onChange={(e) =>
                        saveSettings({
                          ...settings,
                          general: { ...settings.general, autoSave: e.target.checked },
                        })
                      }
                      className="h-5 w-5 accent-bookends-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <h2 className="text-2xl font-bold text-bookends-accent mb-4 text-center">Appearance Settings</h2>
                <div className="space-y-4">
                  <div>
                    <span className="text-lg">Theme Color</span>
                    <div className="mt-4 flex justify-center">
                      <SketchPicker
                        color={themeColor}
                        onChangeComplete={handleColorChange}
                        disableAlpha
                        presetColors={["#F9E0B2", "#DBF99A", "#77878B", "#192e03", "#ecfcca"]}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Dark Mode</span>
                    <input
                      type="checkbox"
                      checked={settings.appearance?.darkMode || false}
                      onChange={(e) =>
                        saveSettings({
                          ...settings,
                          appearance: { ...settings.appearance, darkMode: e.target.checked },
                        })
                      }
                      className="h-5 w-5 accent-bookends-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div>
                <h2 className="text-2xl font-bold text-bookends-accent mb-4 text-center">Privacy Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Enable Encryption</span>
                    <input
                      type="checkbox"
                      checked={settings.privacy?.encryption || false}
                      onChange={(e) =>
                        saveSettings({
                          ...settings,
                          privacy: { ...settings.privacy, encryption: e.target.checked },
                        })
                      }
                      className="h-5 w-5 accent-bookends-accent"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Require Password</span>
                    <input
                      type="checkbox"
                      checked={settings.privacy?.requirePassword || false}
                      onChange={(e) =>
                        saveSettings({
                          ...settings,
                          privacy: { ...settings.privacy, requirePassword: e.target.checked },
                        })
                      }
                      className="h-5 w-5 accent-bookends-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "misc" && (
              <div>
                <h2 className="text-2xl font-bold text-bookends-accent mb-4 text-center">Miscellaneous Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Enable Beta Features</span>
                    <input
                      type="checkbox"
                      checked={settings.misc?.betaFeatures || false}
                      onChange={(e) =>
                        saveSettings({
                          ...settings,
                          misc: { ...settings.misc, betaFeatures: e.target.checked },
                        })
                      }
                      className="h-5 w-5 accent-bookends-accent"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Send Usage Data</span>
                    <input
                      type="checkbox"
                      checked={settings.misc?.sendUsageData || false}
                      onChange={(e) =>
                        saveSettings({
                          ...settings,
                          misc: { ...settings.misc, sendUsageData: e.target.checked },
                        })
                      }
                      className="h-5 w-5 accent-bookends-accent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;