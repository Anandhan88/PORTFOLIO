import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const SafeIcon = ({ icon, name, title, ...props }) => {
  const IconComponent = icon;
  const label = name || title || props['aria-label'];

  const iconProps = {
    ...(label ? { 'aria-label': label, role: 'img' } : { 'aria-hidden': 'true' }),
    ...props
  };

  return IconComponent
    ? React.createElement(IconComponent, iconProps)
    : <FiAlertTriangle {...iconProps} />;
};

export default SafeIcon;