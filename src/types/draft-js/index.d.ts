import { ContentState } from 'draft-js';

import { ReactNode } from 'react';

declare module 'draft-js' {
  export interface DraftDecoratorComponentProps {
    blockKey: any;
    children?: ReactNode;
    contentState: ContentState;
    decoratedText: string;
    dir?: any;
    end: number;
    entityKey?: string;
    offsetKey: string;
    start: number;
  }
}
