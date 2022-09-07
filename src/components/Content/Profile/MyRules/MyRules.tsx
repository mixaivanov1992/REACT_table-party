import { PageRoute } from '@models/accessiblePage';
import React from 'react';
import RulesList from '@shared/RulesList/RulesList';

const MyRules: React.FC = () => {
    console.info('MyRules');
    const ruleEdit = PageRoute.ruleEdit.split(':')[0];
    const rulePlay = PageRoute.runRule.split(':')[0];

    return (
        <RulesList rulePlay={rulePlay} ruleEdit={ruleEdit} />
    );
};

export default MyRules;
