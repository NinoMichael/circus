import React from "react"
import { Dropdown } from "primereact/dropdown"
import { useLanguage } from "../context/LanguageContext"

const DropDownCircus = () => {
    const { language, switchLanguage } = useLanguage()

    const langOptions = [
        { name: 'Français', code: 'FR' },
        { name: 'English', code: 'EN' }
    ];

    const handleLanguageChange = (e) => {
        switchLanguage(e.target.value);
    };

    return (
        <div className='flex mt-11 me-8 justify-end max-[1115px]:me-4 space-x-10 max-sm:space-x-6 max-[1115px]:space-x-3'>
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
    )
}

export default DropDownCircus