import React from 'react';

export default ({ children, className, dark = false }) => <div>
    <div className={`text-30 d-none d-sm-block mb-1 text-${dark ? "light" : "secondary"} ${className}`}>
        {children}
    </div>

    <div className={`text-24 d-sm-none mb-1 text-${dark ? "light" : "secondary"} ${className}`}>
        {children}
    </div>
</div>;