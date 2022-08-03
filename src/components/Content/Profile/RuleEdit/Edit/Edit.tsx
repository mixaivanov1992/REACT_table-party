import { useTypedSelector } from '@hooks/useTypedSelector';
import Chapters from '@shared/RuleEdit/Chapters/Chapters';
import Menu from '@shared/RuleEdit/Menu/Menu';
import React, { useMemo } from 'react';
import Settings from '@components/Shared/RuleEdit/Settings/Settings';

interface Props {
    ruleId: string
}

const Edit: React.FC<Props> = (props) => {
    console.info('Edit');
    const { ruleId } = props;
    const { username } = useTypedSelector((state) => state.personalDataReducer);
    const cover = useTypedSelector((state) => state.RuleReducer[ruleId].cover);
    const gameName = useTypedSelector((state) => state.RuleReducer[ruleId].name);

    const components = useMemo((): JSX.Element => (
        <Chapters ruleUid={ruleId} />
    ), []);

    return (
        <div>
            <Menu ruleUid={ruleId} gameName={gameName} cover={cover} username={username} />
            <Settings ruleUid={ruleId} gameName={gameName} cover={cover} />
            {components}
        </div>
    );
};

export default Edit;
