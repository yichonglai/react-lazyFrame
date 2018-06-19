import React, { Component } from 'react';

import style from './Page1.less';

import image from './images/bg.jpg';

export default class Page1 extends Component {
    render() {
        return (
            <div className={style.box}>
                this is page1~
                <img src={image} alt="ll" />
                <span>fdshfdasjfadhjs</span>
            </div>
        );
    }
}
