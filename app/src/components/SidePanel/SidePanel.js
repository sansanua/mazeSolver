import React, { useState } from 'react';
import './SidePanel.scss';
import { Open } from 'components/common/Icons';

export default function SidePanel({ onOpen, children }) {
    const [isShowSidePanel, setIsShowSidePanel] = useState(false);
    const handleOpen = () => {
        setIsShowSidePanel(!isShowSidePanel);
        onOpen(!isShowSidePanel);
    };

    return (
        <div className="sidePanel">
            <div onClick={handleOpen} className="openButton">
                <Open rotate={isShowSidePanel ? 180 : 0} />
            </div>
            <div className={['contentContainer', !isShowSidePanel ? 'hide' : ''].join(' ')}>
                {children}
            </div>
        </div>
    );
}
