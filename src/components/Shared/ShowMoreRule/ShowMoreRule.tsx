import { actionGetRules } from '@store/actions/ruleAction';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/shared/showMoreRule';
import React, { useLayoutEffect, useState } from 'react';
import styles from '@css/shared/showMoreRule/ShowMoreRule.module.scss';

interface Props {
    name?: string,
    author?: string,
}

const ShowMoreRule: React.FC<Props> = (props) => {
    console.info('ShowMoreRule');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const { name, author } = props;
    const limit = 12;

    const rulesReducer = useTypedSelector((state) => state.ruleReducer);
    const numberRules = Object.keys(rulesReducer).map((key) => {
        if (name && rulesReducer[key].name.includes(name)) {
            return key;
        }
        if (author && rulesReducer[key].author.includes(author)) {
            return key;
        }
        return key;
    }).length - 1;

    const [numberRecords, setNumberRecords] = useState<number>(numberRules);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const getRules = actionGetRules(dispatch, limit, currentPage);

    async function showMore() {
        const result = await getRules();
        if (result.isSuccess && result.data) {
            setNumberRecords((result.data as {numberRecords: number}).numberRecords);
        }
    }

    useLayoutEffect(() => {
        showMore();
        setCurrentPage((prevState) => prevState + 1);
        // console.log(Math.floor(numberRules / limit));
    }, []);

    const onClickShowMore = () => {
        showMore();
        setCurrentPage((prevState) => prevState + 1);
        // console.log(numberRules / limit);
    };

    return (
        (numberRecords > limit * currentPage) ? <div className={styles.show_more}><button type="button" onClick={onClickShowMore}>{Localization.showMore}</button></div> : null
    );
};
ShowMoreRule.defaultProps = {
    name: undefined,
    author: undefined,
};

export default ShowMoreRule;
