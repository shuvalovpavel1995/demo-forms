import React from 'react';

export const Counter = () => {
    const renderCounter = React.useRef(0);
    renderCounter.current = renderCounter.current + 1;
    return (
        <div
            style={{
                position: 'relative',
                top: '0',
                right: '0',
                fontStyle: 'normal',
                textAlign: 'center',
                height: '24px',
                width: '24px',
                borderRadius: '15px',
                lineHeight: '24px',
                border: '1px solid #ddd',
                background: '#eee',
            }}
        >
            {renderCounter.current}
        </div>
    );
};
