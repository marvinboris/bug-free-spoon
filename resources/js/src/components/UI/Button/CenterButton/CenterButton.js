import React from 'react';
import { Button } from 'reactstrap';

export default ({ onClick, children, color, icon, className, size, type, left }) =>
    <Button color={color} size={size} type={type} onClick={onClick} className={`rounded-15 px-4 py-3 text-16 text-700 ${className}`}>
        {left && <i className={"fas fa-" + icon + " mr-3"} />}
        
        <>{children}</>

        {!left && <i className={"fas fa-" + icon + " ml-3"} />}
    </Button>;