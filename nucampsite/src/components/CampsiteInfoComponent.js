import React, { Component } from 'react';
import {CAMPSITES} from './shared/campsites'

class CampsiteInfo extends Component{


    render(){
        if(CAMPSITES == true){
            return <div className="row" />
        }else{
            return <div />
        }
    }
}

export default CampsiteInfo;