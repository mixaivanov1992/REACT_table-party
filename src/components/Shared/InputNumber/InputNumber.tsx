import React from 'react';

interface Props{
    uid: string,
    value: number,
    onInputData(value: string): void
}

const InputNumber: React.FC<Props> = (props) => {
    const { uid, value, onInputData } = props;
    return (
        <input
            id={uid}
            key={uid}
            type="text"
            onInput={(e) => {
                const targetValue = e.currentTarget.value;
                if ((new RegExp('^[1-9]').test(targetValue) && new RegExp('^[0-9]+$').test(targetValue)) || targetValue === '') {
                    onInputData(targetValue);
                }
            }}
            value={String(value).replace(/^0/, '')}
        />
    );
};

export default InputNumber;
