import React from 'react';
import ArizaQoldirish from '@/components/ArizaQoldirish';
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
            <ArizaQoldirish />
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
