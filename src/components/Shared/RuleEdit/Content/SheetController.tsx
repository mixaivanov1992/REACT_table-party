import { ContentTypes } from '@models/contentTypes';
import { Offset } from '@src/assets/types/offset';
import { sheetOffset } from '@store/reducer/sheetReducer';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Content from '@shared/RuleEdit/Content/Content';
import Localization from '@localization/components/shared/ruleEdit/content';
import React from 'react';
import SheetItem from '@shared/RuleEdit/Content/SheetItem/SheetItem';

interface Props {
    ruleUid: string,
    chapterIndex: number,
}
const Sheets: React.FC<Props> = (props) => {
    console.info('Sheets');
    Localization.setLanguage(navigator.language);

    const { ruleUid, chapterIndex } = props;
    const chapterUid = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].uid);
    const itemCount = useTypedSelector((state) => state.sheetReducer[chapterUid]?.length || 0);

    // eslint-disable-next-line
    const renderContent = (forcePageAfterDelete:()=>void, forcePageOffset:(offset: Offset, index: number)=>void) => (index: number) => (
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
        <Content
            elementOffset={sheetOffset}
            renderContent={renderContent}
            contentTypes={ContentTypes.SHEET}
            itemCount={itemCount}
            uid={chapterUid}
        />
    );
};

export default Sheets;
