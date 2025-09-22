import React from 'react';
import Sorovnoma from '@/components/Sorovnoma';
import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';
import WhyChooseUs from '@/components/WhyChooseUs';
import Cources from '@/components/Cources';
import Teachers from '@/components/Teachers';
import Statistika from '@/components/Statistika';
import Fikirlar from '@/components/Fikirlar';
import Contact from '@/components/Contact';

const Main = () => {
    return (
        <div>
            <Carousel />
            <Sorovnoma />
            <WhyChooseUs />
            <Cources />
            <Teachers />
            <Statistika />
            <Fikirlar />
            <Contact />
            <Footer />
        </div>
    );
};

export default Main;