import { ContentTypes } from '@models/contentTypes';
import { addSheet, deleteSheets } from '@store/reducer/sheetReducer';
import { removeChapter, setChapterCover, setChapterName } from '@store/reducer/chapterReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import Settings from '@shared/RuleEdit/Settings/Settings';

interface Props {
    ruleUid: string,
    chapterIndex: number,
    forcePageAfterDelete(): void,
}

const ChapterSettings: React.FC<Props> = (props) => {
    console.info('ChapterSettings');
    const dispatch = useDispatch();
    const { ruleUid, chapterIndex, forcePageAfterDelete } = props;

    const chapterUid = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].uid);
    const chapterName = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].name);
    const chapterCover = useTypedSelector((state) => state.chapterReducer[ruleUid][chapterIndex].cover);
    const stateCount = useTypedSelector((state) => state.sheetReducer[chapterUid]?.length || 0);

    const [countItem, SetCountItem] = useState<number>(1);

    const addItem = (): void => {
        const sheets = {
            [chapterUid]: [...Array(countItem)].map(() => ({ uid: uuidv4(), content: '', cover: '' })),
        };
        dispatch(addSheet(sheets));
    };

    const onClickConfirmRemove = (): void => {
        dispatch(deleteSheets([chapterUid]));
        dispatch(removeChapter(ruleUid, chapterUid));
        forcePageAfterDelete();
    };

    return (
        <Settings
            contentTypes={ContentTypes.CHAPTER}
            title={chapterName}
            countItem={countItem}
            stateCount={stateCount}
            cover={chapterCover}
            onChangeTitle={(name: string) => dispatch(setChapterName(ruleUid, chapterUid, name))}
            onInputCountItem={(count: number) => SetCountItem(count)}
            onChangeCover={(cover: string) => dispatch(setChapterCover(ruleUid, chapterUid, cover))}
            onClickConfirmRemove={onClickConfirmRemove}
            addItem={addItem}
        />
    );
};

export default ChapterSettings;
