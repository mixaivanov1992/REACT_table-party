import { useTypedSelector } from '@hooks/useTypedSelector';
import React from 'react';
import styles from '@css/shared/loader/Loader.module.scss';

const Loader: React.FC = () => {
    const { isLoading } = useTypedSelector((state) => state.loaderReducer);

    return (
        isLoading
            ? (
                <div className={styles.loader}>
                    <div>
                        <div className={`${styles.dice} ${styles.panel_load}`}>
                            <div className={`${styles.face} ${styles.front}`}>
                                <div>
                                    <div className={`${styles.point} ${styles.left_top}`} />
                                    <div className={`${styles.point} ${styles.left_bottom}`} />
                                    <div className={`${styles.point} ${styles.left_center}`} />
                                    <div className={`${styles.point} ${styles.right_center}`} />
                                    <div className={`${styles.point} ${styles.right_top}`} />
                                    <div className={`${styles.point} ${styles.right_bottom}`} />
                                </div>
                            </div>
                            <div className={`${styles.face} ${styles.back}`}>
                                <div>
                                    <div className={styles.point} />
                                </div>
                            </div>
                            <div className={`${styles.face} ${styles.left}`}>
                                <div>
                                    <div className={`${styles.point} ${styles.left_top}`} />
                                    <div className={`${styles.point} ${styles.left_bottom}`} />
                                    <div className={`${styles.point} ${styles.right_top}`} />
                                    <div className={`${styles.point} ${styles.right_bottom}`} />
                                </div>
                            </div>
                            <div className={`${styles.face} ${styles.right}`}>
                                <div>
                                    <div className={`${styles.point} ${styles.left_bottom}`} />
                                    <div className={styles.point} />
                                    <div className={`${styles.point} ${styles.right_top}`} />
                                </div>
                            </div>
                            <div className={`${styles.face} ${styles.bottom}`}>
                                <div>
                                    <div className={`${styles.point} ${styles.left_bottom}`} />
                                    <div className={`${styles.point} ${styles.right_top}`} />
                                </div>
                            </div>
                            <div className={`${styles.face} ${styles.top}`}>
                                <div>
                                    <div className={`${styles.point} ${styles.left_top}`} />
                                    <div className={`${styles.point} ${styles.left_bottom}`} />
                                    <div className={styles.point} />
                                    <div className={`${styles.point} ${styles.right_top}`} />
                                    <div className={`${styles.point} ${styles.right_bottom}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            : null
    );
};

export default Loader;
