import React from 'react';

const Typography = ({ variant, children }) => {
    const getClassName = (variant) => {
        switch (variant) {
            case 'h1':
                return 'text-4xl font-bold';
            case 'h2':
                return 'text-3xl font-semibold';
            case 'h3':
                return 'text-2xl font-medium';
            case 'p':
                return 'text-base';
            default:
                return 'text-base';
        }
    };

    return (
        <div className={getClassName(variant)}>
            {children}
        </div>
    );
};

export default Typography;