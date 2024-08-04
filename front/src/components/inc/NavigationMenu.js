import React from "react"
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

import {Dropdown} from 'primereact/dropdown'
import {Menubar} from 'primereact/menubar'

import logo from '../../images/logo/logo.png'

const NavigationMenu = () => {
    const { language, switchLanguage, t } = useLanguage();
    const history = useNavigate();

    const menuItems = [
        {
            label: t('home'),
            command: () => history('/')
        },
        {
            label: t('about'),
            command: () => history('/about')
        },
        {
            label: t('projects'),
            command: () => history('/projects')
        },
        {
            label: t('contact'),
            command: () => history('/contact')
        }
    ];

    const logoContainer = (
        <div>
            <img src={logo} alt="Logo" width={100} height={100} className='w-24 h-24 max-xs:w-20 max-xs:h-20' loading = "lazy" />
        </div>
    );

      const langOptions = [
        { name: 'FR', code: 'FR' },
        { name: 'EN', code: 'EN' }
    ];

      const placeholderText = langOptions.find(option => option.code === language)?.name || 'FR'

    const handleLanguageChange = (e) => {
        switchLanguage(e.value.code);
    };

    const languageDropdown = (
        <div className='flex mt-2 space-x-10 max-sm:space-x-6'>
            <i className='pi pi-globe custom-globe-icon'></i>
            <Dropdown value={language} onChange={handleLanguageChange}
                options={langOptions} optionLabel='code' optionValue='code'
                className='h-8 w-16 -mt-2 border border-none shadow-md custom-p-dropdown'
                panelClassName='text-sm' placeholder= {placeholderText}
                dropdownIcon="pi pi-chevron-down text-sm mt-1" />
        </div>
    );

    return (
        <>
            <div className='max-[960px]:hidden'>
                <Menubar model={menuItems} className='text-white font-poppins custom-menubar' start={logoContainer} end={languageDropdown} />
            </div>

            <div className='min-[961px]:hidden flex justify-between mx-24 max-sm:mx-12 max-xs:mx-6'>
                <div className = "flex justify-start">
                    <Menubar model={menuItems} className='text-white font-poppins custom-menubar' />
                    <div className = "ms-4 max-xs:ms-2"> {logoContainer} </div>
                </div>

                <div className='mt-6'>  {languageDropdown} </div>
            </div>
        </>
    )
}

export default NavigationMenu