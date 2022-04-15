import React from 'react';
import ViewContent from '../components/ViewContent';
import Navbar from '../components/Navbar'
import {useRouter} from 'next/router'

const view = () => {

    return (
        <div>
            
            <Navbar />
            
            <ViewContent />
        </div>
    );
};

export default view;