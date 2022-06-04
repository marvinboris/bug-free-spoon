import React from 'react';
import { Button } from 'reactstrap';

export default ({ left, children, color, icon, iconColor = 'reset', className = '', size, pill = false, block, type, onClick }) => <Button block={block} color={color} size={size} type={type} onClick={onClick} className={`d-inline-flex justify-content-center align-items-center text-14 text-400 px-4 py-2 ${pill ? ' rounded-pill ' : 'rounded-10'} ${className}`}>
    {left && <i size="lg" className={`fas fa-${icon} mr-3 text-${iconColor}`} />}

    <>{children}</>

    {!left && <i size="lg" className={`fas fa-${icon} ml-3 text-${iconColor}`} />}
</Button>;