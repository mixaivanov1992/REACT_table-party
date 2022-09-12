import PaginateItems from '@shared/Paginate/PaginateItems';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '@css/shared/paginate/Paginate.module.scss';

interface Props {
    renderContent(index: number): JSX.Element,
    itemCount: number,
    itemsPerPage: number
}

const Paginate: React.FC<Props> = (props) => {
    console.info('Paginate');

    const { renderContent, itemCount, itemsPerPage } = props;
    const paginateItems = [...Array(itemCount)].map((empty, i) => i);

    const [pageCount, setPageCount] = useState<number>(Math.ceil(itemCount / itemsPerPage));
    const [itemOffset, setItemOffset] = useState<number>(0);
    const currentItems = paginateItems.slice(itemOffset, itemOffset + itemsPerPage);

    useEffect(() => {
        setPageCount(Math.ceil(itemCount / itemsPerPage));
    }, [itemCount, itemsPerPage]);

    const handlePageClick = (event: {selected: number}) => {
        const newOffset = (event.selected * itemsPerPage) % itemCount;
        setItemOffset(newOffset);
    };
    if (itemOffset === itemCount) {
        setItemOffset((prevState) => prevState - 1);
    }
    return (
        <>
            <PaginateItems renderContent={renderContent} currentItems={currentItems} />
            <div className={styles.paginate}>
                <ReactPaginate
                    forcePage={itemOffset}
                    breakLabel="..."
                    nextLabel="»"
                    onPageChange={handlePageClick}
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
