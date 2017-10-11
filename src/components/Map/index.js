import React, { Component } from 'react'
import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl"

import Images from '../../themes/images'

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibW9iaWxlZGV2Nzc1IiwiYSI6ImNqNXFyMnBhczBvM3kyd211M3dtZTh4ejQifQ.DA8_iVN0ijZKD4plfd-pOw"    
})

class MapView extends Component {
    render() {
        return (
            <Map 
                style="mapbox://styles/mapbox/streets-v10"
                containerStyle={{
                    height: "50vh",
                    width: "70vw"
                }}
                center={[12.5866593, 55.6795204]}
                zoom={[15]}
            >  
                <Marker
                    coordinates={[12.5866593, 55.6795204]}
                    anchor="top"
                >
                    <img src={Images.marker} style={{width:'50px', height:'50px'}}/>
                </Marker>              
                <Layer>
                    <Feature coordinates={[12.5866593, 55.6795204]}/>
                </Layer>
            </Map>
        )
    }
}

export default MapView
