import React from 'react';
import Styles from './index.module.scss' 


export default class SudoTable extends React.Component {
    
    render() {
        return (
        <div className={Styles['sudo-table-container']}>
            {
                this.props.list.map((row,idx)=>{
                    return (<ul key={idx} className={Styles['row']}>
                                {
                                    row.map((item,index)=>{
                                    return (<li key={index}
                                    onClick={()=>{this.props.setKey(idx,index)}}
                                    className={[Styles['cell'],this.props.selectedKey.join(',') === [idx,index].join(',') ? Styles['selected'] : null,
                                    item.origin ? null : Styles['fill-num']].join(' ')}
                                    >{item.value === 0 ? '' : item.value}</li>)
                                    })
                                }
                            </ul>)
                })
            }
            
        </div>
        );
    }
}