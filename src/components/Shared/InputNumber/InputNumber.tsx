import React from 'react';

interface Props{
    id: string,
    value: number,
    onInputData(value: number): void
}

const InputNumber: React.FC<Props> = (props) => {
    const { id, value, onInputData } = props;
    return (
        <input
            id={id}
            type="text"
            onInput={(e) => {
                const targetValue = +e.currentTarget.value;
                if (Number.isInteger(targetValue)) {
                    onInputData(targetValue);
                }
            }}
            value={value.toString().replace(/^0/, '')}
        />
    );
};

export default InputNumber;
