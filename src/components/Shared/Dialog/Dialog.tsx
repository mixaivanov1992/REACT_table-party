import { CSSTransition } from 'react-transition-group';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '@css/shared/dialog/Dialog.module.scss';

/* eslint-disable */
interface Props {
    onClickCloseDialog(): void,
    isOpen: boolean,
    title: string,
    content: JSX.Element | string,
    footer: JSX.Element | string,
    dialogSize: string,
}
/* eslint-enable */

const defaultProps = {
    footer: '',
};

const Dialog: React.FC<Props> = (props) => {
    console.info('Dialog');
    const {
        onClickCloseDialog, isOpen, title, content, footer, dialogSize,
    } = { ...defaultProps, ...props };
    const root = document.createElement('div');

    useEffect(() => {
        if (isOpen) {
            const main = document.getElementsByTagName('main')[0];
            main.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.appendChild(root);
            return () => {
                main.style.overflow = 'inherit';
                document.body.style.overflow = 'inherit';
                document.body.removeChild(root);
            };
        }
        return () => {};
    }, [isOpen, root]);

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames={{
                enter: 'dialog_enter',
                enterActive: 'dialog_enter_active',
                exit: 'dialog_exit',
                exitActive: 'dialog_exit_active',
            }}
            mountOnEnter
            unmountOnExit
        >
            <>
                {ReactDOM.createPortal(
                    <>
                        <div className={styles.wrapper}>
                            <div className={`${styles.dialog} ${styles[`${dialogSize}`]}`}>
                                <div className={styles.header}>
                                    <div className={styles.title}>{title}</div>
                                    <div
                                        role="button"
                                        tabIndex={-1}
                                        onKeyPress={() => {}}
                                        onClick={onClickCloseDialog}
                                        className={styles.close}
                                    >
                                        &#10005;
                                    </div>
                                </div>
                                <div className={styles.container}>
                                    {content}
                                </div>
                                {footer && (
                                    <div className={styles.footer}>
                                        {footer}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.dialog_background} />
                    </>,
                    root,
                )}
            </>
        </CSSTransition>
    );
};
export default Dialog;
