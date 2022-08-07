import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import React from 'react';

interface Parameters {
    url: string
}

const RunRule: React.FC = () => {
    console.info('RunRule');
    const { url } = useParams<Parameters>();

    const rule = useTypedSelector((state) => Object.keys(state.RuleReducer).filter((key, q, q2) => (console.log(key, q, q2))));
    console.log(rule);

    return (
        <div>123</div>
    );
};

export default RunRule;
