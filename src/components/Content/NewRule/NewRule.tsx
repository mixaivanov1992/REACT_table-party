import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Chapters from '@shared/RuleEdit/Chapters/Chapters';
import Menu from '@shared/RuleEdit/Menu/Menu';
import React, { ReactNode, useMemo } from 'react';
import Settings from '@components/Shared/RuleEdit/Settings/Settings';

interface Props {
    children: ReactNode
}
const NewRule: React.FC<Props> = (props) => {
    console.info('NewRule');
    const name = useTypedSelector((state) => state.RuleReducer[DefaultRuleKey].name);
    const cover = useTypedSelector((state) => state.RuleReducer[DefaultRuleKey].cover);
    const { username } = useTypedSelector((state) => state.personalDataReducer);

    const { children } = props;
    const components = useMemo((): JSX.Element => (
        <Chapters ruleUid={DefaultRuleKey} />
    ), []);

    return (
        <>
            {children}
            <div>
                <Menu ruleUid={DefaultRuleKey} gameName={name} cover={cover} username={username} />
                <Settings ruleUid={DefaultRuleKey} gameName={name} cover={cover} />
                {components}
            </div>
        </>
    );
};

export default NewRule;
