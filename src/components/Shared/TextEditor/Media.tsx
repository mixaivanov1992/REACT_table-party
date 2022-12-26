import { ContentBlock, ContentState } from 'draft-js';
import React from 'react';

interface BlockComponentProps {
  contentState: ContentState;
  block: ContentBlock;
}

const Image = (props: BlockComponentProps) => {
    const { block, contentState } = props;
    const { src, style, parentStyle } = contentState.getEntity(block.getEntityAt(0)).getData();
    return <div style={parentStyle}><img src={src} alt={src} role="presentation" style={style} /></div>;
};

const Media = (props: BlockComponentProps) => {
    const { contentState, block } = props;

    const entity = contentState.getEntity(block.getEntityAt(0));
    const type = entity.getType();

    if (type === 'image') {
        return <Image contentState={contentState} block={block} />;
    }

    return null;
};

export const mediaBlockRenderer = (contentBlock: ContentBlock) => {
    const entity = contentBlock.getEntityAt(0);
    if (!entity) {
        return null;
    }

    const type = contentBlock.getType();
    switch (type) {
    case 'atomic':
        return {
            component: Media,
            editable: false,
        };
    default:
        return null;
    }
};
