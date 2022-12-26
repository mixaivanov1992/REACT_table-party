import { ContentTypes } from '@models/contentTypes';
import { Offset } from '@src/assets/types/offset';
import { useDispatch } from 'react-redux';
import Localization from '@localization/components/shared/ruleEdit/content';
import Paginate from '@shared/Paginate/Paginate';
import React, { useState } from 'react';
import styles from '@css/shared/ruleEdit/content/Content.module.scss';

interface Props {
    elementOffset: (offset: number, uid: string, index: number) => void,
    renderContent: (forcePageAfterDelete:()=>void, forcePageOffset:(offset: Offset, index: number)=>void) => (index: number) => JSX.Element,
    contentTypes: ContentTypes,
    itemCount: number,
    uid: string
}

const Content: React.FC<Props> = (props) => {
    console.info('Content');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);

    const {
        elementOffset, renderContent, contentTypes, itemCount, uid,
    } = props;

    const itemsPerPage = 1;
    const pageCount = Math.ceil(itemCount / itemsPerPage);
    const [forcePage, setForcePage] = useState<number>(0);

    const onPageChange = (event: {selected: number}) => {
        setForcePage(event.selected);
    };

    const forcePageAfterDelete = () => {
        const itemCountAfterDelete = itemCount - 1;
        const currentPage = forcePage + 1;

        if (forcePage && currentPage === pageCount && !(itemCountAfterDelete % itemsPerPage)) {
            setForcePage((prevState) => prevState - 1);
        }
    };

    const forcePageOffset = (offsetDirection: Offset, index: number) => {
        if (offsetDirection === Offset.LEFT && forcePage) {
            const offset = -1;
            dispatch(elementOffset(offset, uid, index));
            setForcePage((prevState) => prevState + offset);
        } else if (offsetDirection === Offset.RIGHT) {
            const offset = 1;
            const currentPage = forcePage + 1;
            if (currentPage < pageCount) {
                dispatch(elementOffset(offset, uid, index));
                setForcePage((prevState) => prevState + offset);
            }
        }
    };

    return (
        <div className={styles[contentTypes]}>
            {itemCount
                ? (
                    <>
                        <Paginate renderContent={renderContent(forcePageAfterDelete, forcePageOffset)} onPageChange={onPageChange} itemCount={itemCount} itemsPerPage={itemsPerPage} forcePage={forcePage} pageCount={pageCount} />
                        <div className={styles.navigation}>{Localization[contentTypes].navigation}</div>
                    </>
                )
                : <div className={styles.noData}>{Localization.noData}</div>}
        </div>
    );
};

export default Content;
