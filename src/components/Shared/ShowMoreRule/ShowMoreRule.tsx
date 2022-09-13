import { actionGetNumberRules, actionGetRules } from '@store/actions/ruleAction';
import { useDispatch } from 'react-redux';
import { useGetRulesKeys } from '@hooks/useGetRulesKeys';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/shared/showMoreRule';
import React, { useLayoutEffect, useState } from 'react';
import styles from '@css/shared/showMoreRule/ShowMoreRule.module.scss';

interface Props {
    author?: string,
    name?: string,
}

const ShowMoreRule: React.FC<Props> = (props) => {
    console.info('ShowMoreRule');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const { name, author } = props;
    const limit = 12;

    const rulesReducer = useTypedSelector((state) => state.ruleReducer);
    const numberRulesReducer = useGetRulesKeys(rulesReducer, author || '', name || '').length;

    const [numberRules, setNumberRules] = useState<number>(numberRulesReducer);
    const [currentPage, setCurrentPage] = useState<number>((Math.ceil(numberRulesReducer / limit)));
    const getRules = actionGetRules(dispatch, limit, currentPage, author || '', name || '');

    async function getNumberRules() {
        const result = await actionGetNumberRules(author || '', name || '');
        if (result.isSuccess && result.data) {
            setNumberRules((result.data as {numberRules: number}).numberRules);
        }
    }

    useLayoutEffect(() => {
        getNumberRules();
        if (!currentPage) {
            getRules();
            setCurrentPage((prevState) => prevState + 1);
        }
    }, []);

    const onClickShowMore = () => {
        getRules();
        setCurrentPage((prevState) => prevState + 1);
    };

    return (
        (numberRules > limit * currentPage) ? <div className={styles.show_more}><button type="button" onClick={onClickShowMore}>{Localization.showMore}</button></div> : null
    );
};
ShowMoreRule.defaultProps = {
    name: undefined,
    author: undefined,
};

export default ShowMoreRule;
