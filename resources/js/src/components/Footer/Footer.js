import React from 'react';

import './Footer.css';

export default () => <div className="Footer bg-soft text-center text-10 text-secondary">
    <footer className="py-4">
        Copyrights {(new Date()).getFullYear()} | E-menu loop by <span className="text-orange">Briluce</span>.
    </footer>
</div>;