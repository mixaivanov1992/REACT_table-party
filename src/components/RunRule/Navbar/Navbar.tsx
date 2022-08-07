import { IoMdImages } from 'react-icons/io';
import { useIsValidHttpUrl } from '@hooks/useIsValidHttpUrl';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import styles from '@css/runRule/navbar/Navbar.module.scss';

interface Props {
    ruleId: string
}

const Navbar: React.FC<Props> = (props) => {
    console.info('Navbar');
    const { ruleId } = props;
    const chapters = useTypedSelector((state) => state.chapterReducer[ruleId]);
    const isValidHttpUrl = useIsValidHttpUrl();
    const [selected, setSelected] = useState<number>(0);

    const chapterCount = chapters.length ? chapters.length - 1 : 0;

    const nextItem = () => {
        if (selected < chapterCount) {
            setSelected(selected + 1);
        }
    };
    const prevItem = () => {
        if (selected > 0) {
            setSelected(selected - 1);
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.chapters}>
                {
                    chapters.map((item, index) => (
                        <div
                            key={uuidv4()}
                            role="button"
                            tabIndex={-1}
                            onKeyPress={() => {}}
                            onClick={() => { setSelected(index); }}
                            className={`${styles.chapter} ${index === selected ? styles.selected : ''}`}
                        >
                            <div className={styles.name}>{item.name}</div>
                            {isValidHttpUrl(item.cover) ? <img className={styles.cover} src={item.cover} alt={item.name} /> : <IoMdImages className={styles.cover} />}
                        </div>
                    ))
                }
            </div>
            <div className={styles.menu}>
                <button type="button" onClick={prevItem}>Prev</button>
                <button type="button" onClick={nextItem}>Next</button>
            </div>
        </div>
    );
};

export default Navbar;
