import React from 'react';
import Styles from './index.module.scss' 


export default class SudoKeyBoard extends React.Component {
    
    clickEvent=(num)=>{
        this.props.click(num)
    }
    render() {
        return (
            <ul className={Styles['key-board-container']}>
                {
                    [1,2,3,4,5,6,7,8,9].map((item,index)=>{
                    return (<li disabled={this.props.disabled} key={index} className={Styles['item']}
                    onClick={()=>{this.clickEvent(item)}}
                    >{item}</li>)
                    })
                }
            </ul>
        );
    }
}