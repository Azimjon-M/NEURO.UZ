import React from 'react';
import Sorovnoma from '@/components/Sorovnoma';
import Carousel from '@/components/Carousel';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import Experts from '@/components/Experts';
import Statistika from '@/components/Statistika';
import Fikirlar from '@/components/Fikirlar';
import Contact from '@/components/Contact';

const Main = () => {
    return (
        <div>
            <Carousel />
            <Sorovnoma />
            <WhyChooseUs />
            <Services />
            <Experts />
            <Statistika />
            <Fikirlar />
            <Contact />
        </div>
    );
};

export default Main;
