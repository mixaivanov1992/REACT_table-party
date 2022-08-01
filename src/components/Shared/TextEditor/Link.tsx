import { CompositeDecorator, DraftDecoratorComponentProps } from 'draft-js';
import React from 'react';

export const Link = (props: DraftDecoratorComponentProps) => {
    const { contentState, entityKey, children } = props;
    if (entityKey) {
        const { url } = contentState.getEntity(entityKey).getData();
        return (
            <a rel="noopener noreferrer" target="_blank" href={url}>
                {children}
            </a>
        );
    }
    return false;
};

export const linkDecorator = new CompositeDecorator([
    {
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();
                return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
            }, callback);
        },
        component: Link,
    },
]);
