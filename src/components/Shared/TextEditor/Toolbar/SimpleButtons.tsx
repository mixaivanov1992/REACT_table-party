import { AiOutlineOrderedList, AiOutlineUnorderedList } from 'react-icons/ai';
import { EditorState, RichUtils } from 'draft-js';
import {
    MdFormatBold, MdFormatItalic, MdFormatStrikethrough, MdFormatUnderlined, MdOutlineFormatAlignCenter, MdOutlineFormatAlignLeft, MdOutlineFormatAlignRight,
} from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

interface Props {
    editorState: EditorState,
    setEditorState: (state: EditorState)=>void;
}

const SimpleButtons: React.FC<Props> = (props) => {
    const { editorState, setEditorState } = props;

    const actionsList = [{
        method: 'toggleBlockType',
        arguments: 'unstyled',
        content: 'N',
    }, {
        method: 'toggleBlockType',
        arguments: 'header-one',
        content: 'H1',
    }, {
        method: 'toggleBlockType',
        arguments: 'header-two',
        content: 'H2',
    }, {
        method: 'toggleBlockType',
        arguments: 'header-three',
        content: 'H3',
    }, {
        method: 'toggleBlockType',
        arguments: 'ordered-list-item',
        icon: AiOutlineOrderedList,
    }, {
        method: 'toggleBlockType',
        arguments: 'unordered-list-item',
        icon: AiOutlineUnorderedList,
    }, {
        method: 'toggleBlockType',
        arguments: 'align-left',
        icon: MdOutlineFormatAlignLeft,
    }, {
        method: 'toggleBlockType',
        arguments: 'align-center',
        icon: MdOutlineFormatAlignCenter,
    }, {
        method: 'toggleBlockType',
        arguments: 'align-right',
        icon: MdOutlineFormatAlignRight,
    }, {
        method: 'toggleInlineStyle',
        arguments: 'BOLD',
        icon: MdFormatBold,
    }, {
        method: 'toggleInlineStyle',
        arguments: 'UNDERLINE',
        icon: MdFormatUnderlined,
    }, {
        method: 'toggleInlineStyle',
        arguments: 'ITALIC',
        icon: MdFormatItalic,
    }, {
        method: 'toggleInlineStyle',
        arguments: 'STRIKETHROUGH',
        icon: MdFormatStrikethrough,
    }];

    const onClickAction = (e: React.MouseEvent | React.KeyboardEvent, method: string, blockType: string) => {
        e.preventDefault();
        setEditorState(RichUtils[method](editorState, blockType));
    };

    return (
        <>
            {actionsList.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={uuidv4()}
                        type="button"
                        onClick={(event) => onClickAction(event, item.method, item.arguments)}
                    >
                        {Icon ? <Icon /> : item.content}
                    </button>
                );
            })}
        </>
    );
};

export default SimpleButtons;
