import React from 'react';

import './Chevrons.css';

let intervalLeft;
let intervalRight;

export default ({ id }) => {
    const goToLeft = () => document.getElementById(id).scrollLeft -= 10;
    const goToRight = () => document.getElementById(id).scrollLeft += 10;

    const activateLeft = () => {
        intervalLeft = setInterval(goToLeft, 20);
    }
    const activateRight = () => {
        intervalRight = setInterval(goToRight, 20);
    }

    const deactivateLeft = () => {
        if (intervalLeft) clearInterval(intervalLeft);
    };
    const deactivateRight = () => {
        if (intervalRight) clearInterval(intervalRight);
    };

    return <div className="UI Chevrons text-15 text-md-17 text-xxl-19 text-blue px-2 px-md-3 px-xxl-4">
        <div className="pr-2 pr-md-3 pr-xxl-4">
            <i className="fad fa-chevron-double-left"
                onMouseDown={activateLeft}
                onMouseUp={deactivateLeft}
                onMouseLeave={deactivateLeft}

                onTouchStart={activateLeft}
                onTouchEnd={deactivateLeft}
            />
        </div>

        <div>
            <i className="fad fa-chevron-double-right"
                onMouseDown={activateRight}
                onMouseUp={deactivateRight}
                onMouseLeave={deactivateRight}

                onTouchStart={activateRight}
                onTouchEnd={deactivateRight}

            />
        </div>
    </div>;
}