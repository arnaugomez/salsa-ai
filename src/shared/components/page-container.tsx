import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

/**
 * A container component for pages with consistent styling
 */
export function PageContainer({ 
  children, 
  title, 
  className = '' 
}: PageContainerProps) {
  return (
    <div className={`flex flex-col items-center justify-start min-h-screen p-4 sm:p-8 ${className}`}>
      {title && (
        <h1 className="text-3xl font-bold text-primary mb-6">{title}</h1>
      )}
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
}
