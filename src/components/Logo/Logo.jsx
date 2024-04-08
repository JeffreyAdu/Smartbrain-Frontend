import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0 ' style={{ width: '10em' }}>
            <Tilt className='Tilt br2 shadow-3' clastiltReverse='false'>
                <div className='Tilt-inner pa3' style={{ height: '150px',width: '150px' }}>
                    <img src={brain} alt='logo' style={{paddingTop:'5px'}}></img>
                </div>
            </Tilt>

        </div>
    )



}

export default Logo;