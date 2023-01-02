import { ContentTypes } from '@models/contentTypes';
import { Offset } from '@src/assets/types/offset';
import { chapterOffset } from '@store/reducer/chapterReducer';
import { useTypedSelector } from '@hooks/useTypedSelector';
import ChapterSettings from '@shared/RuleEdit/Settings/ChapterSettings';
import Content from '@shared/RuleEdit/Content/Content';
import Localization from '@localization/components/shared/ruleEdit/content';
import React from 'react';
import SheetContent from '@shared/RuleEdit/Content/SheetContent';
import styles from '@css/shared/ruleEdit/content/Content.module.scss';

interface Props{
    ruleUid: string,
}

const ChapterContent: React.FC<Props> = (props) => {
    console.info('ChapterContent');
    Localization.setLanguage(navigator.language);

    const { ruleUid } = props;
    const itemCount = useTypedSelector((state) => state.chapterReducer[ruleUid]?.length || 0);

    // eslint-disable-next-line
    const renderContent = (forcePageAfterDelete:()=>void, forcePageOffset:(offset: Offset, index: number)=>void) => (index: number) => (
        <div className={styles.container}>
            <div className={styles.header}>{`${Localization.chapter.number}${index + 1}`}</div>
            <ChapterSettings forcePageAfterDelete={forcePageAfterDelete} ruleUid={ruleUid} chapterIndex={index} />
            <SheetContent ruleUid={ruleUid} chapterIndex={index} />
            <div className={styles.offset}>
                <button type="button" onClick={() => { forcePageOffset(Offset.LEFT, index); }}>{Localization.chapter.offsetLeft}</button>
                <button type="button" onClick={() => { forcePageOffset(Offset.RIGHT, index); }}>{Localization.chapter.offsetRight}</button>
            </div>
        </div>
    );

    return (
        <Content
            elementOffset={chapterOffset}
            renderContent={renderContent}
            contentTypes={ContentTypes.CHAPTER}
            itemCount={itemCount}
            uid={ruleUid}
        />
    );
};

export default ChapterContent;
