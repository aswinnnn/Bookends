import React from "react";
import Sidepanel from "../Sidepanel";

interface AboutProps {
  setSelected: React.Dispatch<React.SetStateAction<"home" | "create">>;
}

const About: React.FC<AboutProps> = ({ setSelected }) => {
  return (
    <div className="relative min-h-screen backdrop-blur-md text-white dark:text-gray-300">
      {/* Sidepanel */}
      <Sidepanel setSelected={setSelected} />

      {/* About Page Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header Section */}
        <div className="glass-blur bg-gradient-to-br from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl hover:shadow-bookends-accent/50 transition-shadow duration-500 max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-bookends-accent mb-4">
            About Bookends
          </h1>
          <p className="text-lg text-white/80 dark:text-gray-400">
            Bookends is a free and open-source journaling app designed to help
            you reflect, write, and discover patterns in your life. Built with
            love for the community, it’s a modern journaling experience for
            everyone.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {/* Feature 1 */}
          <div className="glass-blur bg-gradient-to-br from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-bookends-accent/50 transition-shadow duration-500 group">
            <h2 className="text-2xl font-semibold text-bookends-accent mb-2 group-hover:text-white transition-colors duration-300">
              🌟 Open Source
            </h2>
            <p className="text-white/80 dark:text-gray-400 group-hover:text-white/90 transition-colors duration-300">
              Bookends is completely open source, allowing anyone to
              contribute, customize, and improve the app.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-blur bg-gradient-to-br from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-bookends-accent/50 transition-shadow duration-500 group">
            <h2 className="text-2xl font-semibold text-bookends-accent mb-2 group-hover:text-white transition-colors duration-300">
              ✍️ Journaling Made Easy
            </h2>
            <p className="text-white/80 dark:text-gray-400 group-hover:text-white/90 transition-colors duration-300">
              Write down your thoughts, reflect on your day, and keep track of
              your life with an intuitive and beautiful interface.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-blur bg-gradient-to-br from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-bookends-accent/50 transition-shadow duration-500 group">
            <h2 className="text-2xl font-semibold text-bookends-accent mb-2 group-hover:text-white transition-colors duration-300">
              🌍 Community Driven
            </h2>
            <p className="text-white/80 dark:text-gray-400 group-hover:text-white/90 transition-colors duration-300">
              Join a growing community of contributors and users who are
              passionate about journaling and self-reflection.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="glass-blur bg-gradient-to-br from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl shadow-lg p-6 mt-12 text-center hover:shadow-xl hover:shadow-bookends-accent/50 transition-shadow duration-500 max-w-4xl">
          <h2 className="text-3xl font-bold text-bookends-accent mb-4">
            Get Involved
          </h2>
          <p className="text-lg text-white/80 dark:text-gray-400 mb-6">
            Want to contribute to Bookends? Check out our GitHub repository
            and join the community of developers and designers making this app
            better every day.
          </p>
          <a
            href="https://github.com/your-repo/bookends"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-bookends-accent text-white dark:text-black px-6 py-3 rounded-full shadow-md hover:bg-bookends-accent-dark hover:shadow-lg hover:shadow-bookends-accent/50 transition-all duration-300"
          >
            Visit GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;