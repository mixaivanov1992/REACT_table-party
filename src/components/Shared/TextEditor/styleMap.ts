import { ContentBlock } from 'draft-js';

export const colors = {
    black: {
        color: 'rgba(0, 0, 0, 1.0)',
    },
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
};
export const fontsSize = {
    size4: {
        fontSize: '4px',
    },
    size6: {
        fontSize: '6px',
    },
    size8: {
        fontSize: '8px',
    },
    size10: {
        fontSize: '10px',
    },
    size12: {
        fontSize: '12px',
    },
    size14: {
        fontSize: '14px',
    },
    size16: {
        fontSize: '16px',
    },
    size18: {
        fontSize: '18px',
    },
    size20: {
        fontSize: '20px',
    },
    size22: {
        fontSize: '22px',
    },
    size24: {
        fontSize: '24px',
    },
    size26: {
        fontSize: '26px',
    },
    size28: {
        fontSize: '28px',
    },
    size36: {
        fontSize: '36px',
    },
    size42: {
        fontSize: '42px',
    },
    size72: {
        fontSize: '72px',
    },
};
export const fontsFamily = {
    arial: {
        fontFamily: 'Arial',
    },
    georgia: {
        fontFamily: 'Georgia',
    },
    impact: {
        fontFamily: 'Impact',
    },
    tahoma: {
        fontFamily: 'Tahoma',
    },
    timesNewRoman: {
        fontFamily: 'Times New Roman',
    },
    verdana: {
        fontFamily: 'Verdana',
    },
};

export const textAlign = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
    case 'align-left':
        return 'align-left';
    case 'align-center':
        return 'align-center';
    case 'align-right':
        return 'align-right';
    case 'color-red':
        return 'color-red';
    default:
        return '';
    }
};
