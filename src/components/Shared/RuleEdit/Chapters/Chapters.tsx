import { Offset } from '@src/assets/types/offset';
import { chapterOffset } from '@store/reducer/chapterReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import ChapterController from '@shared/RuleEdit/Settings/ChapterController';
import Localization from '@localization/components/shared/ruleEdit/chapter';
import Paginate from '@shared/Paginate/Paginate';
import React, { useState } from 'react';
import Sheets from '@shared/RuleEdit/Chapters/Sheets/Sheets';
import styles from '@css/shared/ruleEdit/chapters/Chapters.module.scss';

interface Props{
    ruleUid: string,
}

const Chapter: React.FC<Props> = (props) => {
    console.info('Chapter');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);

    const itemsPerPage = 1;
    const { ruleUid } = props;
    const itemCount = useTypedSelector((state) => state.chapterReducer[ruleUid]?.length || 0);

    const pageCount = Math.ceil(itemCount / itemsPerPage);
    const [forcePage, setForcePage] = useState<number>(0);

    const onPageChange = (event: {selected: number}) => {
        setForcePage(event.selected);
    };

    const forcePageAfterDelete = () => {
        const itemCountAfterDelete = itemCount - 1;
        const currentPage = forcePage + 1;

        if (forcePage && currentPage === pageCount && !(itemCountAfterDelete % itemsPerPage)) {
            setForcePage((prevState) => prevState - 1);
        }
    };

    const forcePageOffset = (offset: Offset, index: number) => {
        if (offset === Offset.LEFT && forcePage) {
            const elementOffset = -1;
            dispatch(chapterOffset(elementOffset, ruleUid, index));
            setForcePage((prevState) => prevState + elementOffset);
        } else if (offset === Offset.RIGHT) {
            const currentPage = forcePage + 1;
            const elementOffset = 1;
            if (currentPage < pageCount) {
                dispatch(chapterOffset(elementOffset, ruleUid, index));
                setForcePage((prevState) => prevState + elementOffset);
            }
        }
    };

    const renderContent = (index: number): JSX.Element => (
        <div className={styles.container}>
            <div className={styles.header}>{`${Localization.chapter}${index + 1}`}</div>
            <ChapterController forcePageAfterDelete={forcePageAfterDelete} ruleUid={ruleUid} chapterIndex={index} />
            <Sheets ruleUid={ruleUid} chapterIndex={index} />
            <div className={styles.offset}>
                <button type="button" onClick={() => { forcePageOffset(Offset.LEFT, index); }}>{Localization.offsetLeft}</button>
                <button type="button" onClick={() => { forcePageOffset(Offset.RIGHT, index); }}>{Localization.offsetRight}</button>
            </div>
        </div>
    );

    return (
        <div className={styles.chapter}>
            {itemCount
                ? (
                    <>
                        <Paginate renderContent={renderContent} onPageChange={onPageChange} itemCount={itemCount} itemsPerPage={itemsPerPage} forcePage={forcePage} pageCount={pageCount} />
                        <div className={styles.navigation}>{Localization.chaptersNavigation}</div>
                    </>
                )
                : <div className={styles.noData}>{Localization.noData}</div>}
        </div>
    );
};

export default Chapter;
