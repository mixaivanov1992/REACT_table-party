import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/shared/ruleEdit/chapter/sheets/';
import Paginate from '@shared/Paginate/Paginate';
import React from 'react';
import SheetItem from '@shared/RuleEdit/Chapters/Sheets/SheetItem/SheetItem';
import styles from '@css/shared/ruleEdit/chapters/sheets/Sheets.module.scss';

interface Props {
    ruleUid: string,
    chapterIndex: number,
}
const Sheets: React.FC<Props> = (props) => {
    console.info('Sheets');
    Localization.setLanguage(navigator.language);

    const sheetCountPerPage = 1;
    const { ruleUid, chapterIndex } = props;
    const chapterUid = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].uid);
    const sheetCount = useTypedSelector((state) => state.sheetReducer[chapterUid]?.length || 0);

    const renderContent = (index: number): JSX.Element => (
        <SheetItem ruleUid={ruleUid} chapterUid={chapterUid} sheetIndex={index} chapterIndex={chapterIndex} />
    );

    return (
        <div className={styles.sheets}>
            {sheetCount
                ? (
                    <>
                        <Paginate renderContent={renderContent} itemCount={sheetCount} itemsPerPage={sheetCountPerPage} />
                        <div className={styles.navigation}>{Localization.sheetsNavigation}</div>
                    </>
                )
                : <div className={styles.noData}>{Localization.noData}</div>}
        </div>
    );
};

export default Sheets;
