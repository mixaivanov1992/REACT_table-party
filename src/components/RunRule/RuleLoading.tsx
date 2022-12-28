import { actionGetRule } from '@store/actions/ruleAction';
import { actionHandler } from '@store/actions/actionHandler';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Close from '@components/RunRule/Close/Close';
import Page404 from '@components/Content/Page404/Page404';
import React, { useLayoutEffect, useState } from 'react';
import RunRule from '@components/RunRule/RunRule';

interface Parameters {
    id: string
}

const RuleLoading: React.FC = () => {
    console.info('RuleLoading');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { id: ruleId } = useParams<Parameters>();

    const rule = useTypedSelector((state) => state.ruleReducer[ruleId]);
    const chapters = useTypedSelector((state) => state.chapterReducer[ruleId]);
    const getRule = actionGetRule(dispatch, ruleId);

    useLayoutEffect(() => {
        if (!chapters) {
            (async () => {
                await actionHandler(dispatch, getRule);
                setIsLoading(true);
            })();
        }
    }, []);

    if (!isLoading) {
        return null;
    }
    if (isLoading && !rule) {
        return <Page404 />;
    }

    return chapters ? <RunRule rule={rule} chapters={chapters} /> : <Close />;
};

export default RuleLoading;
