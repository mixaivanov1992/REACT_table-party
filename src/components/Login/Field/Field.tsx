import InputWrapper from '@shared/InputWrapper/InputWrapper';
import React from 'react';

interface Props {
    text: string,
    value: string,
    type: string,
    id: string,
    fillField: (value:string)=>void;
}

const Field: React.FC<Props> = (props) => {
    const {
        text, value, type, id, fillField,
    } = props;
    return (
        <div>
            <InputWrapper
                htmlFor={id}
                text={text}
                value={value}
            >
                <input
                    onChange={(e) => { fillField(e.currentTarget.value.trim()); }}
                    type={type}
                    id={id}
                    value={value}
                />
            </InputWrapper>
        </div>
    );
};
export default React.memo(Field);
