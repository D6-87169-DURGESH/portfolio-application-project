import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../services/api";

const Settings = () => {
  const [settings, setSettings] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleToggleDarkMode = async () => {
    const updatedSettings = { ...settings, darkMode: !settings.darkMode };
    await updateSettings(updatedSettings, token);
    setSettings(updatedSettings);
  };

  return (
    <div className="container my-5">
      <h2>Settings</h2>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={settings.darkMode}
          onChange={handleToggleDarkMode}
        />
        <label className="form-check-label">Enable Dark Mode</label>
      </div>
    </div>
  );
};

export default Settings;
