import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import Chapters from '@shared/RuleEdit/Chapters/Chapters';
import Menu from '@shared/RuleEdit/Menu/Menu';
import React, { ReactNode } from 'react';
import RuleController from '@shared/RuleEdit/Settings/RuleController';

interface Props {
    children: ReactNode
}
const NewRule: React.FC<Props> = (props) => {
    console.info('NewRule');

    const { children } = props;

    return (
        <>
            {children}
            <div>
                <Menu ruleUid={DefaultRuleKey} />
                <RuleController ruleUid={DefaultRuleKey} />
                <Chapters ruleUid={DefaultRuleKey} />
            </div>
        </>
    );
};

export default NewRule;
