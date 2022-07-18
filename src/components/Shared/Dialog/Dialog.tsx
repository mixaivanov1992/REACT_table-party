import { CSSTransition } from 'react-transition-group';
import React, { useEffect } from 'react';
import styles from '@css/shared/dialog/Dialog.module.scss';

interface Props {
    onClickCloseDialog(): void,
    isOpen: boolean,
    title: string,
    content: JSX.Element,
    beforeFooter?: JSX.Element,
    footer?: JSX.Element,
    dialogSize?: string,
}
const Dialog: React.FC<Props> = (props) => {
    console.info('Dialog');
    const {
        onClickCloseDialog, isOpen, title, content, beforeFooter, footer, dialogSize,
    } = props;
    useEffect(() => {
        const main = document.getElementsByTagName('main')[0];
        if (isOpen) {
            main.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }
        return () => {
            main.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

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
                <div className={styles.wrapper}>
                    <div className={`${styles.dialog} ${styles[`dialog_${dialogSize}`]}`}>
                        <div className={styles.header}>
                            <div className={styles.title}>{title}</div>
                            <div
                                role="button"
                                tabIndex={-1}
                                onKeyPress={() => {}}
                                onClick={() => { onClickCloseDialog(); }}
                                className={styles.close}
                            >
                                &#10005;
                            </div>
                        </div>
                        <div className={styles.container}>
                            {content}
                        </div>
                        {beforeFooter && (
                            <div className={styles.before_footer}>
                                {beforeFooter}
                            </div>
                        )}
                        {footer && (
                            <div className={styles.footer}>
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.dialog_background} />
            </>
        </CSSTransition>
    );
};
Dialog.defaultProps = {
    beforeFooter: undefined,
    footer: undefined,
    dialogSize: 'auto',
};

export default Dialog;
