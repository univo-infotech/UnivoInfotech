import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
  loading = false,
  type = 'button',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-inter font-medium transition-all duration-300 focus:outline-none';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#0066FF] to-[#00B4D8] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
    secondary: 'bg-[#1A2B4A] text-white hover:bg-[#1A2B4A]/90',
    outline: 'bg-transparent border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white',
  };

  const borderRadius = 'rounded-full';

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${borderRadius} ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`;

  const renderContent = () => (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  const MotionComponent = motion(href ? Link : 'button');

  const motionProps = {
    whileHover: loading ? {} : { scale: 1.02, y: -2 },
    whileTap: loading ? {} : { scale: 0.98 },
  };

  if (href) {
    return (
      <MotionComponent
        to={href}
        className={combinedClasses}
        {...motionProps}
      >
        {renderContent()}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      type={type}
      onClick={onClick}
      disabled={loading}
      className={combinedClasses}
      {...motionProps}
    >
      {renderContent()}
    </MotionComponent>
  );
};

export default Button;
