import React from "react"
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { Dropdown } from 'primereact/dropdown'
import { Menubar } from 'primereact/menubar'
import logo from '../../images/logo/logo.png'
import { Button } from "primereact/button"
import { Link } from "react-router-dom"

const NavigationMenu = () => {
    const { language, switchLanguage, t } = useLanguage();
    const navigate = useNavigate();

    const menuItems = [
        {
            label: t('home'),
            command: () => navigate('/')
        },
        {
            label: t('trip'),
            command: () => navigate('/trip')
        },
        {
            label: 'Blog',
            command: () => navigate('/blog')
        },
        {
            label: t('about'),
            command: () => navigate('/about')
        }
    ]

    const menuItemsMobile = [
        {
            label: t('home'),
            command: () => navigate('/')
        },
        {
            label: t('trip'),
            command: () => navigate('/trip')
        },
        {
            label: 'Blog',
            command: () => navigate('/blog')
        },
        {
            label: t('about'),
            command: () => navigate('/about')
        },
        {
            label: t('login'),
            command: () => navigate('/login')
        },
        {
            label: t('register'),
            command: () => navigate('/register-email')
        },
    ]

    const logoContainer = (
        <div>
            <img src={logo} alt="Logo" width={100} height={100} className='w-24 h-24 me-48 max-xl:me-32 max-[1175px]:me-16 max-[1175px]:-ms-8 max-[1010px]:me-4 max-xmd:w-20 max-xmd:h-20' />
        </div>
    )

    const authBtn = (
        <div className="flex ms-20 max-xl:ms-8 space-x-3">
            <Link to="/login"><Button label={t('login')} className="bg-amber-400 hover:bg-amber-500 font-poppins border border-none outline outline-none text-sm max-sm:text-xs" /></Link>
            <Link to="/register-email"><Button label={t('register')} className="bg-slate-900 hover:bg-slate-950 text-white font-poppins border border-none outline outline-none text-sm max-sm:text-xs" /></Link>
        </div>
    )


    const langOptions = [
        { name: 'Français', code: 'FR' },
        { name: 'English', code: 'EN' }
    ];

    const handleLanguageChange = (e) => {
        switchLanguage(e.value);
    };

    const languageDropdown = (
        <div className='flex mt-11 me-8 max-[1115px]:me-4 space-x-10 max-sm:space-x-6 max-[1115px]:space-x-3'>
            <i className='pi pi-globe custom-globe-icon'></i>
            <Dropdown
                value={language}
                onChange={handleLanguageChange}
                options={langOptions}
                optionLabel='code'
                optionValue='code'
                className='h-8 w-16 -mt-2 border border-none shadow-md custom-p-dropdown'
                panelClassName='text-sm'
                placeholder={language}
                dropdownIcon="pi pi-chevron-down text-sm mt-1"
                valueTemplate={(option) => <span>{option.code}</span>}
                itemTemplate={(option) => <span>{option.code}</span>}
            />
        </div>
    );

    return (
        <>
            <div className='max-xmd:hidden flex justify-between'>
                <Menubar model={menuItems} className='text-white font-poppins custom-menubar' start={logoContainer} end={authBtn} />
                {languageDropdown}
            </div>

            <div className='xmd:hidden max-sm:hidden flex justify-between mx-16 max-md:mx-8'>
                <div className="flex justify-start mt-3">
                    <Menubar model={menuItems} className='text-white font-poppins custom-menubar' />
                    <div className="ms-12 max-xs:ms-2"> {logoContainer} </div>
                </div>

                <div className="flex space-x-12 max-md:space-x-8">
                    <div className="mt-9"> {authBtn} </div>
                    <div> {languageDropdown} </div>
                </div>

            </div>

            <div className='sm:hidden flex justify-between mx-16 max-md:mx-8 max-xs:mx-4'>
                <div className="flex justify-start mt-3">
                    <Menubar model={menuItemsMobile} className='text-white font-poppins custom-menubar' />
                    <div className="ms-12 max-xs:ms-8"> {logoContainer} </div>
                </div>

                <div> {languageDropdown} </div>
            </div>
        </>
    )
}

export default NavigationMenu;
