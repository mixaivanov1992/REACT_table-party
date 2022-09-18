import { v4 as uuidv4 } from 'uuid';
import React, { Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '@css/shared/paginate/Paginate.module.scss';

interface Props {
    renderContent(index: number): JSX.Element,
    onPageChange(event: {selected: number}): void,
    itemCount: number,
    itemsPerPage: number,
    forcePage: number,
    pageCount: number
}

const Paginate: React.FC<Props> = (props) => {
    console.info('Paginate');

    const {
        renderContent, onPageChange, itemCount, itemsPerPage, forcePage, pageCount,
    } = props;

    const paginateItems = [...Array(itemCount)].map((empty, i) => i);
    const itemOffset = ((forcePage * itemsPerPage) % itemCount);
    const currentItems = paginateItems.slice(itemOffset, itemOffset + itemsPerPage);

    return (
        <>
            {currentItems.map((item) => (<Fragment key={uuidv4()}>{renderContent(item)}</Fragment>))}
            <div className={styles.paginate}>
                <ReactPaginate
                    forcePage={forcePage}
                    breakLabel="..."
                    nextLabel="»"
                    onPageChange={onPageChange}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="«"
                    breakClassName={styles.paginate_item}
                    breakLinkClassName={styles.paginate_link}
                    pageClassName={styles.paginate_item}
                    pageLinkClassName={styles.paginate_link}
                    previousClassName={styles.paginate_item}
                    previousLinkClassName={styles.paginate_link}
                    nextClassName={styles.paginate_item}
                    nextLinkClassName={styles.paginate_link}
                    activeClassName={styles.active}
                />
            </div>
        </>
    );
};

export default Paginate;
