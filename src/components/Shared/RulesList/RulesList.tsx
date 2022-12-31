import { IoMdImages } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useGetRulesKeys } from '@hooks/useGetRulesKeys';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Localization from '@localization/components/shared/rulesList';
import React from 'react';
import styles from '@css/shared/rulesList/RulesList.module.scss';

/* eslint-disable */
interface Props {
    rulePlay: string,
    ruleEdit?: string,
    name?: string,
    author?: string,
}
/* eslint-enable */

const defaultProps = {
    ruleEdit: '',
    name: '',
    author: '',
};

const RulesList: React.FC<Props> = (props) => {
    console.info('RulesList');
    Localization.setLanguage(navigator.language);

    const {
        rulePlay, ruleEdit, name, author,
    } = { ...defaultProps, ...props };
    const rulesReducer = useTypedSelector((state) => state.ruleReducer);
    const rulesKey = useGetRulesKeys(rulesReducer, author, name);
    const rules = rulesKey.map((key) => {
        const { name: nameRule, author: authorRule, cover } = rulesReducer[key];
        return (
            <div key={uuidv4()} className={styles.rule}>
                <div className={styles.logo}>
                    {cover ? <img src={cover} alt={nameRule} /> : <IoMdImages />}
                </div>
                <div className={styles.author}>
                    {`${Localization.author} - ${authorRule}`}
                </div>
                <div className={styles.name}>
                    {nameRule}
                </div>
                <div className={styles.menu}>
                    <Link to={{ pathname: rulePlay + key }}><button type="button">{Localization.play}</button></Link>
                    {ruleEdit && <Link to={{ pathname: ruleEdit + key }}><button type="button">{Localization.edit}</button></Link>}
                </div>
            </div>
        );
    });

    return (
        <div className={styles.rulesList}>{rules}</div>
    );
};

export default RulesList;
