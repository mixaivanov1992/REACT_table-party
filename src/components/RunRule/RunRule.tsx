import { BsFillArrowDownSquareFill } from 'react-icons/bs';
import { useIsValidHttpUrl } from '@hooks/useIsValidHttpUrl';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Navbar from '@components/RunRule/Navbar/Navbar';
import React, { useRef } from 'react';
import styles from '@css/runRule/RunRule.module.scss';

interface Parameters {
    url: string
}

const RunRule: React.FC = () => {
    console.info('RunRule');
    const { url } = useParams<Parameters>();
    const isValidHttpUrl = useIsValidHttpUrl();
    const runRule = useRef() as React.MutableRefObject<HTMLDivElement>;

    const rules = useTypedSelector((state) => state.RuleReducer);
    const ruleId = Object.keys(rules).filter((key) => rules[key].url === url)[0];
    const rule = rules[ruleId];

    return (
        <div className={styles.runRule} ref={runRule}>
            {
                isValidHttpUrl(rule.cover) && (
                    <div className={styles.cover}>
                        <img src={rule.cover} alt={rule.cover} />
                        <div>
                            <div
                                role="button"
                                tabIndex={-1}
                                onKeyPress={() => {}}
                                onClick={() => runRule?.current.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                            >
                                <BsFillArrowDownSquareFill />
                                <div className={styles.svg_background} />
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={styles.rule}>
                <Navbar ruleId={ruleId} />
                <div className={styles.content}>111</div>
            </div>
        </div>
    );
};

export default RunRule;
