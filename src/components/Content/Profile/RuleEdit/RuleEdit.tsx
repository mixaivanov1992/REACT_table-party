import { PageAlias } from '@models/accessiblePage';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Edit from '@shared/RuleEdit/RuleEdit';
import Page404 from '@components/Content/Page404/Page404';
import React from 'react';

interface Parameters {
    id: string
}

const RuleEdit: React.FC = () => {
    const { id: ruleId } = useParams<Parameters>();

    const { username } = useTypedSelector((state) => state.personalDataReducer);
    const author = useTypedSelector((state) => state.ruleReducer[ruleId]?.author);

    if (username === author) {
        return (
            <Edit ruleUid={ruleId} pageAlias={PageAlias.ruleEdit} />
        );
    }

    return <Page404 />;
};

export default RuleEdit;
