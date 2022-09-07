import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { PageAlias } from '@models/accessiblePage';
import React from 'react';
import RuleEdit from '@shared/RuleEdit/RuleEdit';

const NewRule: React.FC = () => (
    <RuleEdit ruleUid={DefaultRuleKey} pageAlias={PageAlias.newRule} />
);

export default NewRule;
