import React from 'react';
import { DNA } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 select-none w-[100vw] h-[100vh] z-[99999] flex items-center justify-center bg-[#EFF6FF] dark:bg-[#0F172C] ">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default Loader;
