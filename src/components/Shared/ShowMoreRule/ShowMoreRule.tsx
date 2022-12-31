import { actionGetNumberRules, actionGetRules } from '@store/actions/ruleAction';
import { useDispatch } from 'react-redux';
import Localization from '@localization/components/shared/showMoreRule';
import React, { useEffect, useState } from 'react';
import styles from '@css/shared/showMoreRule/ShowMoreRule.module.scss';

interface Props {
    author?: string,// eslint-disable-line
    name?: string,// eslint-disable-line
}

const defaultProps = {
    name: '',
    author: '',
};

const ShowMoreRule: React.FC<Props> = (props) => {
    console.info('ShowMoreRule');
    Localization.setLanguage(navigator.language);

    const dispatch = useDispatch();
    const { name, author } = { ...defaultProps, ...props };
    const limit = 12;

    const [numberRules, setNumberRules] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const getRules = actionGetRules(dispatch, limit, currentPage, author, name);

    const showMore = () => {
        getRules();
        setCurrentPage((prevState) => prevState + 1);
    };

    useEffect(() => {
        (async () => {
            const { numberRules: result } = await actionGetNumberRules(author, name);
            if (result) {
                setNumberRules(result);
            }
            if (!currentPage) {
                showMore();
            }
        })();
    }, []);

    return (
        (numberRules > limit * currentPage) ? <div className={styles.show_more}><button type="button" onClick={showMore}>{Localization.showMore}</button></div> : null
    );
};

export default ShowMoreRule;
