import React from 'react';

export default ({ children, className, dark = false }) => <div>
    <div className={`text-${dark ? "light" : "secondary"} text-18 d-none d-sm-block text-300 ${className}`}>
        {children}
    </div>

    <div className={`text-${dark ? "light" : "secondary"} text-14 d-sm-none text-300 ${className}`}>
        {children}
    </div>
</div>;