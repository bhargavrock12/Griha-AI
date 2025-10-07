import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

// Re-rendered logo for higher fidelity and sharpness
const logoSrc = "assets/logo.png"
const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="pt-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <button onClick={onLogoClick} aria-label="Go to homepage">
          <img src={logoSrc} alt="GrihaAI Logo" className="h-50 sm:h-50 w-auto" />
        </button>
      </div>
    </header>
  );
};

export default Header;
