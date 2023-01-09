import { PageAlias } from '@models/accessiblePage';
import { actionGetRule } from '@store/actions/ruleAction';
import { actionHandler } from '@store/actions/actionHandler';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Edit from '@shared/RuleEdit/RuleEdit';
import Page404 from '@components/Content/Page404/Page404';
import React, { useLayoutEffect } from 'react';

interface Parameters {
    id: string
}

const RuleEdit: React.FC = () => {
    const { id: ruleId } = useParams<Parameters>();
    const dispatch = useDispatch();

    const { username } = useTypedSelector((state) => state.personalDataReducer);
    const author = useTypedSelector((state) => state.ruleReducer[ruleId]?.author);
    const chapters = useTypedSelector((state) => state.chapterReducer[ruleId]);

    const getRule = actionGetRule(dispatch, ruleId);
    useLayoutEffect(() => {
        if (!chapters) {
            actionHandler(dispatch, getRule);
        }
    }, []);

    if (username === author) {
        return (
            <Edit ruleUid={ruleId} pageAlias={PageAlias.ruleEdit} />
        );
    }

    return <Page404 />;
};

export default RuleEdit;
