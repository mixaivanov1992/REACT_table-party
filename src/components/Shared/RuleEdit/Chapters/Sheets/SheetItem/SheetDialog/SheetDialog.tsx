import { setSheetContent } from '@store/reducer/sheetReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Dialog from '@shared/Dialog/Dialog';
import Localization from '@localization/components/shared/ruleEdit/chapter/settings/sheets/sheetItem/sheetDialog';
import React, { useState } from 'react';
import TextEditor from '@shared/TextEditor/TextEditor';
import styles from '@css/shared/ruleEdit/chapters/sheets/sheetItem/sheetDialog/SheetDialog.module.scss';

interface Props {
    onClickCloseDialog: () => void,
    isOpen: boolean,
    chapterUid: string,
    sheetUid: string,
    sheetIndex: number,
}

const SheetDialog:React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    console.info('SheetDialog');

    const {
        onClickCloseDialog, isOpen, chapterUid, sheetUid, sheetIndex,
    } = props;

    const sheetContent = useTypedSelector((state) => state.sheetReducer[chapterUid][sheetIndex].content);
    // const [errorMessage, setErrorMessage] = useState<string>('');

    const editorSave = (content: string) => {
        dispatch(setSheetContent(chapterUid, sheetUid, content));
        onClickCloseDialog();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClickCloseDialog={onClickCloseDialog}
            title={Localization.dataEntry}
            dialogSize="90"
            content={(
                <>
                    <TextEditor
                        initialState={sheetContent}
                        editorSave={editorSave}
                        readOnly={false}
                    >
                        <button type="button" onClick={onClickCloseDialog}>{Localization.close}</button>
                    </TextEditor>
                    {/* <div className={styles.error}>{errorMessage}</div> */}
                </>
            )}
        />
    );
};

export default SheetDialog;
