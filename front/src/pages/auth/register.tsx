import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { useLanguage } from "../../context/LanguageContext"

const Register = () => {
    const { t } = useLanguage()
    const [ checked, setChecked ] = useState(false)

    return (
        <form className="md:-mt-4 flex flex-col justify-center mx-auto items-center">
            <h2 className="font-semibold text-2xl font-rubik">
                { t('registration') }
            </h2>
            <p className="mt-4">
                { t('pleaseFill') }
            </p>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-envelope !ml-2"> </InputIcon>
                <InputText 
                    placeholder={t('emailAddress')}
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-phone !ml-2"> </InputIcon>
                <InputText 
                    placeholder={t('phoneNumber')}
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-lock !ml-2"> </InputIcon>
                <InputText 
                    placeholder={t('password')}
                    type="password"
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-lock !ml-2"> </InputIcon>
                <InputText 
                    placeholder={t('confirmPassword')}
                    type="password"
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <div className='w-72 lg:w-96 text-xs md:text-sm mt-6 flex justify-between gap-6 items-center'>
                <div className="flex gap-2 items-center">
                    <Checkbox 
                        checked={checked}
                        onChange={(e) => setChecked(e.target.value)}
                    />
                    <label>
                        <span>{ t('iAgree') }</span>
                        <Link 
                            to="/" 
                            className='ml-1 font-bold underline underline-offset-2'
                        >
                            { t('terms') }
                        </Link>
                        <span className='ml-1'>{t('and')}</span>
                        <Link 
                            to="/" 
                            className='ml-1 font-bold underline underline-offset-2'
                        >
                            { t('conditions') }
                        </Link>
                    </label>
                </div>

                <div />
            </div>

            <Button 
                label={t('register')}
                className='!bg-amber-400 hover:!bg-amber-300 !font-bold !mt-10 !w-72 lg:!w-96 !rounded-md'
            />

            <div className='mt-10 w-72 lg:w-96 relative'>
                <hr className='opacity-20'/>
                <p className='absolute -top-5 left-[45%] bg-white p-2 uppercase opacity-50 font-medium'>
                    ou
                </p>
            </div>
            
            <Button
                icon="pi pi-google" 
                label={t('googleLogin')}
                className='!bg-gray-600 !text-white hover:!bg-gray-500 !font-bold !mt-10 !w-72 lg:!w-96 !rounded-md'
            />

            <p className='mt-8 text-xs md:text-sm text-center'>
                { t('alreadyHave') }
                <Link 
                    to="/login"
                    className='font-bold underline underline-offset-2 ml-2'
                >
                    { t('login') }
                </Link>
            </p>
        </form>
    )
}

export default Register