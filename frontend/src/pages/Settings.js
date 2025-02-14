import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../services/api";

const Settings = () => {
  const [settings, setSettings] = useState({ darkMode: false }); // ✅ Ensure initial state is valid
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found. User must be logged in.");
      return;
    }
    
    getSettings()
      .then((data) => setSettings(data))
      .catch((error) => console.error("Error fetching settings:", error));
  }, [token]);

  const handleToggleDarkMode = async () => {
    if (!token) {
      console.error("No token found. Cannot update settings.");
      return;
    }

    try {
      const updatedSettings = { ...settings, darkMode: !settings.darkMode };
      await updateSettings(updatedSettings, token);
      setSettings(updatedSettings);
      console.log("Dark mode updated successfully.");
    } catch (error) {
      console.error("Error updating dark mode:", error);
    }
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
