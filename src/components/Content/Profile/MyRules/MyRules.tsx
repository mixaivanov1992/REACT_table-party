import { PageRoute } from '@models/accessiblePage';
import React, { ReactNode } from 'react';
import RulesList from '@shared/RulesList/RulesList';

interface Props {
    children: ReactNode
}

const MyRules: React.FC<Props> = (props) => {
    console.info('MyRules');
    const { children } = props;
    const ruleEdit = PageRoute.ruleEdit.split(':')[0];
    const rulePlay = PageRoute.runRule.split(':')[0];

    return (
        <RulesList rulePlay={rulePlay} ruleEdit={ruleEdit}>
            {children}
        </RulesList>
    );
};

export default MyRules;
