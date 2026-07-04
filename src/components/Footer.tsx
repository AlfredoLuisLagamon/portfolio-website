import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-page mx-auto">
        <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8 md:mb-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-3 md:mb-0">
            © {currentYear} Alfredo Luis Lagamon. All code and content are my
            own.
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-1">
              Built with
              <span className="text-blue-500 dark:text-blue-400">React</span> and
              <span className="text-blue-500 dark:text-blue-400">Next.js</span>
            </p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
