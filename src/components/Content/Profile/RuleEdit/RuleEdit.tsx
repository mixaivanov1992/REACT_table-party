import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Edit from '@components/Content/Profile/RuleEdit/Edit/Edit';
import Page404 from '@components/Content/Page404/Page404';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode
}
interface Parameters {
    id: string
}

const RuleEdit: React.FC<Props> = (props) => {
    console.info('RuleEdit');
    const { children } = props;
    const { id: ruleId } = useParams<Parameters>();

    const { username } = useTypedSelector((state) => state.personalDataReducer);
    const author = useTypedSelector((state) => state.RuleReducer[ruleId]?.author);

    if (username === author) {
        return (
            <>
                {children}
                <Edit ruleId={ruleId} />
            </>
        );
    }

    return <Page404 />;
};

export default RuleEdit;
