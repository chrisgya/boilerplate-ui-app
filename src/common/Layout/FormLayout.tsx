import React from 'react';
import logo from '../../assets/img/logo.png';

const FormLayout: React.FC = ({ children }) => {
    return (
        <section className="text-gray-700 body-font">
            <div className="container px-8 pb-24 mx-auto pt-30 lg:px-4">
                <div className="w-20 p-6 mx-auto"><img src={logo} alt="Chrisgya Company" /></div>
                {children}

            </div>
        </section>
    )
}

export default FormLayout
