import { Offset } from '@src/assets/types/offset';
import { sheetOffset } from '@store/reducer/sheetReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/shared/ruleEdit/chapter/sheets/';
import Paginate from '@shared/Paginate/Paginate';
import React, { useState } from 'react';
import SheetItem from '@shared/RuleEdit/Chapters/Sheets/SheetItem/SheetItem';
import styles from '@css/shared/ruleEdit/chapters/sheets/Sheets.module.scss';

interface Props {
    ruleUid: string,
    chapterIndex: number,
}
const Sheets: React.FC<Props> = (props) => {
    console.info('Sheets');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);

    const itemsPerPage = 1;
    const { ruleUid, chapterIndex } = props;
    const chapterUid = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].uid);
    const itemCount = useTypedSelector((state) => state.sheetReducer[chapterUid]?.length || 0);

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
            dispatch(sheetOffset(elementOffset, chapterUid, index));
            // if ((index + elementOffset) % itemsPerPage) {
            setForcePage((prevState) => prevState + elementOffset);
            // }
        } else if (offset === Offset.RIGHT) {
            const currentPage = forcePage + 1;
            const elementOffset = 1;
            if (currentPage < pageCount) {
                dispatch(sheetOffset(elementOffset, chapterUid, index));
                // if (!((index + elementOffset) % itemsPerPage)) {
                setForcePage((prevState) => prevState + elementOffset);
                // }
            }
        }
    };

    const renderContent = (index: number): JSX.Element => (
        <SheetItem
            ruleUid={ruleUid}
            chapterUid={chapterUid}
            sheetIndex={index}
            chapterIndex={chapterIndex}
            forcePageAfterDelete={forcePageAfterDelete}
            forcePageOffset={forcePageOffset}
        />
    );

    return (
        <div className={styles.sheets}>
            {itemCount
                ? (
                    <>
                        <Paginate renderContent={renderContent} onPageChange={onPageChange} itemCount={itemCount} itemsPerPage={itemsPerPage} forcePage={forcePage} pageCount={pageCount} />
                        <div className={styles.navigation}>{Localization.sheetsNavigation}</div>
                    </>
                )
                : <div className={styles.noData}>{Localization.noData}</div>}
        </div>
    );
};

export default Sheets;
