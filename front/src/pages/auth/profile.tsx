import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

const ProfileRegister = () => {
    const { t } = useLanguage()
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [gender, setGender] = useState('')

    const genderOptions = [
        { label: t('male'), value: 'male' },
        { label: t('female'), value: 'female' },
        { label: t('other'), value: 'other' },
    ]

    return (
        <form 
            className="md:-mt-4 flex flex-col justify-center mx-auto items-center"
        >
            <h2 className="font-semibold text-2xl font-rubik">
                { t('registration') }
            </h2>
            <p className="mt-4">
                { t('pleaseFillProfile') }
            </p>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-user !ml-2"> </InputIcon>
                <InputText
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder={t('lastname')}
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-user !ml-2"> </InputIcon>
                <InputText
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder={t('firstname')}
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-calendar !ml-2"> </InputIcon>
                <InputText
                    value={birth_date}
                    type="date"
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder={t('birthDate')}
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <Dropdown 
                className='!w-72 lg:!w-96 mt-6 !rounded-md'
                value={gender}
                options={genderOptions} 
                onChange={(e) => setGender(e.value)} 
                placeholder="Genre"
                panelClassName='!font-raleway !text-sm md:!text-base'
            />

            <Button 
                label={t('finish')}
                type='submit'
                className='!bg-amber-400 hover:!bg-amber-300 !font-bold !mt-10 !w-72 lg:!w-96 !rounded-md'
            />

            <p className='mt-10 text-xs md:text-sm text-center'>
                { t('alreadyHave') }
                <Link 
                    to="/auth/login"
                    className='font-bold underline underline-offset-2 ml-2'
                >
                    { t('login') }
                </Link>
            </p>
        </form>
    )
}

export default ProfileRegister