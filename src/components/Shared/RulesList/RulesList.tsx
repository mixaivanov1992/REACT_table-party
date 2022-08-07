import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { IoMdImages } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Localization from '@localization/components/shared/rulesList';
import React, { ReactNode } from 'react';
import styles from '@css/shared/rulesList/RulesList.module.scss';

interface Props {
    rulePlay: string,
    ruleEdit?: string,
    children?: ReactNode,
}

const RulesList: React.FC<Props> = (props) => {
    console.info('RulesList');
    Localization.setLanguage(navigator.language);
    const { children, rulePlay, ruleEdit } = props;
    const rulesReducer = useTypedSelector((state) => state.RuleReducer);

    const rulesKey = Object.keys(rulesReducer).filter((key) => DefaultRuleKey !== key);
    const rules = rulesKey.map((key) => {
        const { name, cover, url } = rulesReducer[key];
        return (
            <div key={uuidv4()} className={styles.rule}>
                <div className={styles.logo}>
                    {cover ? <img src={cover} alt={name} /> : <IoMdImages />}
                </div>
                <div className={styles.name}>
                    {name}
                </div>
                <div className={styles.menu}>
                    <Link to={{ pathname: rulePlay + url }}><button type="button">{Localization.play}</button></Link>
                    {ruleEdit && <Link to={{ pathname: ruleEdit + key, state: { children: { children } } }}><button type="button">{Localization.edit}</button></Link>}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className={styles.rulesList}>{rules}</div>
        </div>
    );
};
RulesList.defaultProps = {
    ruleEdit: undefined,
    children: undefined,
};

export default RulesList;
