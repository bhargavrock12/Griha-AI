import React from 'react';

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, children }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-card p-8 sm:p-12 rounded-lg shadow-sm border border-border-main my-8 animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-serif text-text-main mb-10 text-center">{title}</h2>
      {children}
    </div>
  );
};

export default PageWrapper;