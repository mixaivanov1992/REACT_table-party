import { BsArrowDownSquare, BsFillArrowDownSquareFill } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';
import { useIsValidHttpUrl } from '@hooks/useIsValidHttpUrl';
import React, { useState } from 'react';
import styles from '@css/runRule/cover/Cover.module.scss';

interface Props {
    cover: string
}

const Cover: React.FC<Props> = (props) => {
    console.info('Cover');
    const { cover } = props;
    const isValidHttpUrl = useIsValidHttpUrl();
    const [isShowCover, setIsShowCover] = useState<boolean>(isValidHttpUrl(cover));

    return (
        <CSSTransition
            in={isShowCover}
            timeout={1000}
            classNames={{
                exit: `${styles.cover_exit}`,
                exitActive: `${styles.cover_exit_active}`,
            }}
            unmountOnExit
        >

            <div className={styles.cover}>
                <img src={cover} alt={cover} />
                <div
                    className={styles.scrolling}
                    role="button"
                    tabIndex={-1}
                    onKeyPress={() => {}}
                    onClick={() => { setIsShowCover(false); }}
                >
                    <BsFillArrowDownSquareFill />
                    <BsArrowDownSquare />
                </div>
            </div>
        </CSSTransition>
    );
};

export default React.memo(Cover);
