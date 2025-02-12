exports.getHomePage = (req, res) => {
    res.json({
        intro: "Welcome to my professional portfolio!",
        about: "I am a full-stack developer with experience in building high-performance applications.",
        projects: [],
        skills: ["JavaScript", "React", "Node.js", "SQL", "MongoDB"],
        resume_link: "/downloads/resume.pdf",
        blog_posts: [],
        testimonials: [],
        darkMode: false
    });
};
