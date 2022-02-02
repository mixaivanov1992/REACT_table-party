import React, { ReactNode } from 'react';
import Home from '@components/Content/Home/Home'
interface Props {
    children: ReactNode
}
const HomeContainer: React.FC<Props> = (props) => {
    return (
        <>
            {props.children}
            <Home />
        </>
    );
}

export default HomeContainer;