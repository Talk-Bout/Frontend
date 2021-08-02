import React from 'react'
import { Image } from '../elements'

const Test = () => {
    return (
        <div>
            <div>
            <Image size="10"></Image>
            </div>
            <div>
            <Image size="10" width="15" shape="HeaderLogo"></Image>
            </div>
            <div>
            <Image shape='BigProfileImage'></Image>
            </div>
            <div>
            <Image shape="CircleLogo"></Image>
            </div>
            
        </div>
    )
}

export default Test
