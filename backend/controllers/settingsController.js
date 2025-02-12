let settings = {
    darkMode: false,
    seoMeta: {
        title: "My Portfolio",
        description: "A showcase of my work and skills.",
    },
};

exports.getSettings = (req, res) => {
    res.json(settings);
};

exports.updateSettings = (req, res) => {
    settings = { ...settings, ...req.body };
    res.json({ message: "Settings updated", settings });
};
