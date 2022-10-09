import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import { ChapterData } from '@models/services/ruleService';
import { IoMdImages } from 'react-icons/io';
import { useIsValidHttpUrl } from '@hooks/useIsValidHttpUrl';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import styles from '@css/runRule/navbar/Navbar.module.scss';

interface Props {
    chapters: ChapterData,
    selectedChapter: number,
    onClickChapterSelection: (index: number) => void
}

const Navbar: React.FC<Props> = (props) => {
    console.info('Navbar');
    const {
        chapters, selectedChapter, onClickChapterSelection,
    } = props;
    const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(true);
    const isValidHttpUrl = useIsValidHttpUrl();

    const onClickShowHideNavbar = () => {
        setIsOpenNavbar(!isOpenNavbar);
    };

    return (
        <>
            {isOpenNavbar
                ? (
                    <div className={styles.hide_navbar}>
                        <AiOutlineLeftCircle onClick={onClickShowHideNavbar} />
                    </div>
                ) : (
                    <div className={styles.show_navbar}>
                        <AiOutlineRightCircle onClick={onClickShowHideNavbar} />
                    </div>
                )}
            <CSSTransition
                in={isOpenNavbar}
                timeout={500}
                classNames={{
                    enter: `${styles.navbar_enter}`,
                    enterActive: `${styles.navbar_enter_active}`,
                    exit: `${styles.navbar_exit}`,
                    exitActive: `${styles.navbar_exit_active}`,
                }}
                mountOnEnter
                unmountOnExit
            >
                <div className={styles.navbar}>
                    <div className={styles.chapters}>
                        {
                            chapters.map((item, index) => (
                                <div
                                    key={uuidv4()}
                                    role="button"
                                    tabIndex={-1}
                                    onKeyPress={() => {}}
                                    onClick={() => { onClickChapterSelection(index); onClickShowHideNavbar(); }}
                                    className={`${styles.chapter} ${index === selectedChapter ? styles.selected : ''}`}
                                >
                                    <div className={styles.name}>{item.name}</div>
                                    {isValidHttpUrl(item.cover) ? <img className={styles.cover} src={item.cover} alt={item.name} /> : <IoMdImages className={styles.cover} />}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};

export default Navbar;
