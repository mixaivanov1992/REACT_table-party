import { useTypedSelector } from '@hooks/useTypedSelector';
import Paginate from '@shared/Paginate/Paginate';
import React from 'react';
import SheetItem from '@components/Content/NewRule/Chapters/Sheets/SheetItem/SheetItem';
import styles from '@css/content/newRule/chapters/sheets/Sheets.module.scss';

interface Props {
    ruleUid: string,
    chapterIndex: number,
}
const Sheets: React.FC<Props> = (props) => {
    console.info('sheets');

    const sheetCountPerPage = 3;
    const { ruleUid, chapterIndex } = props;
    const chapterUid = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].uid);
    const sheetCount = useTypedSelector((state) => state.sheetReducer[chapterUid]?.length || 0);

    const renderContent = (index: number): JSX.Element => (
        <SheetItem chapterUid={chapterUid} sheetIndex={index} />
    );

    return (
        <div className={styles.sheets}>
            {!!sheetCount && <Paginate renderContent={renderContent} itemCount={sheetCount} itemsPerPage={sheetCountPerPage} />}
        </div>
    );
};

export default Sheets;
