import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { IoMdImages } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { PageRoute } from '@models/accessiblePage';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Localization from '@localization/components/content/profile/myRules';
import React, { ReactNode } from 'react';
import styles from '@css/content/profile/myRules/MyRules.module.scss';

interface Props {
    children: ReactNode
}

const MyRules: React.FC<Props> = (props) => {
    console.info('MyRules');
    Localization.setLanguage(navigator.language);
    const { children } = props;
    const rulesReducer = useTypedSelector((state) => state.RuleReducer);

    const rulesKey = Object.keys(rulesReducer).filter((key) => DefaultRuleKey !== key);
    const rules = rulesKey.map((key) => {
        const { name, cover, url } = rulesReducer[key];
        const ruleEdit = PageRoute.ruleEdit.split(':')[0];
        const rulePlay = PageRoute.runRule.split(':')[0];
        return (
            <div key={uuidv4()} className={styles.rule}>
                <div className={styles.logo}>
                    {cover ? <img src={cover} alt={name} /> : <IoMdImages />}
                </div>
                <div className={styles.name}>
                    {name}
                </div>
                <div className={styles.menu}>
                    <Link to={{ pathname: `${rulePlay}${url}` }}><button type="button">{Localization.play}</button></Link>
                    <Link to={{ pathname: `${ruleEdit}${key}`, state: { children: { children } } }}><button type="button">{Localization.edit}</button></Link>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className={styles.my_rules}>{rules}</div>
        </div>
    );
};

export default MyRules;
