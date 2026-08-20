import React from 'react';
import { Badge } from './Badge';

export const SectionHeading = ({ badge, title, highlightTitle, description, center = false, className = '' }) => {
  return (
    <div className={`space-y-3 ${center ? 'text-center max-w-2xl mx-auto' : ''} ${className}`}>
      {badge && <Badge variant="primary">{badge}</Badge>}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
        {title} {highlightTitle && <span className="text-gradient">{highlightTitle}</span>}
      </h2>
      {description && <p className="text-sm text-slate-600 leading-relaxed">{description}</p>}
    </div>
  );
};
