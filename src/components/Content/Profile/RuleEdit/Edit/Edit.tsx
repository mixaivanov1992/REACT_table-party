import Chapters from '@shared/RuleEdit/Chapters/Chapters';
import Menu from '@shared/RuleEdit/Menu/Menu';
import React from 'react';
import RuleController from '@shared/RuleEdit/Settings/RuleController';

interface Props {
    ruleId: string
}

const Edit: React.FC<Props> = (props) => {
    console.info('Edit');
    const { ruleId } = props;

    return (
        <div>
            <Menu ruleUid={ruleId} />
            <RuleController ruleUid={ruleId} />
            <Chapters ruleUid={ruleId} />
        </div>
    );
};

export default Edit;
