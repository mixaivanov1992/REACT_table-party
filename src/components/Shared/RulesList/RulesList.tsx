import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { IoMdImages } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { actionGetRules } from '@store/actions/ruleAction';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Localization from '@localization/components/shared/rulesList';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from '@css/shared/rulesList/RulesList.module.scss';

interface Props {
    rulePlay: string,
    ruleEdit?: string,
    nameContains?: string,
    children?: ReactNode,
}

const RulesList: React.FC<Props> = (props) => {
    console.info('RulesList');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const limit = 12;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const getRules = actionGetRules(dispatch, limit, currentPage);

    useEffect(() => {
        getRules();
        setCurrentPage((prevState) => prevState + 1);
    }, []);

    const onClickShowMore = () => {
        getRules();
        setCurrentPage((prevState) => prevState + 1);
    };

    const {
        children, rulePlay, ruleEdit, nameContains,
    } = props;
    const rulesReducer = useTypedSelector((state) => state.RuleReducer);

    const rulesKey = Object.keys(rulesReducer).filter(
        (key) => DefaultRuleKey !== key && rulesReducer[key].name.toLowerCase().includes(nameContains?.toLowerCase() || ''),
    );
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
        <>
            <div className={styles.rulesList}>{rules}</div>
            <div className={styles.show_more}><button type="button" onClick={onClickShowMore}>{Localization.showMore}</button></div>
        </>
    );
};
RulesList.defaultProps = {
    ruleEdit: undefined,
    children: undefined,
    nameContains: undefined,
};

export default RulesList;
