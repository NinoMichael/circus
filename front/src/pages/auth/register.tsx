import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { useState, useRef } from 'react'
import { Toast } from 'primereact/toast'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { useLanguage } from "../../context/LanguageContext"
import useAuth from '../../hooks/useAuth'

const Register = () => {
    const { t } = useLanguage()
    const [ checked, setChecked ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ contact, setContact ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirm_password, setConfirmPassword ] = useState('')
    const { register, loading } = useAuth()
    const toast = useRef<Toast>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!checked) {
            toast.current?.show({
                severity: 'warn',
                summary: t('warning'),
                detail: t('acceptTerms'),
                life: 3000,
            })
            return
        }

        const result = await register({ 
            email,
            password,
            contact,
            confirm_password,
            role: 'passenger', 
        })

        if (result.error) {
            toast.current?.show({
                severity: 'error',
                summary: t('error'),
                detail: result.error,
                life: 3000,
            })
        } else if (result.data) {
            toast.current?.show({
                severity: 'success',
                summary: t('success'),
                detail: result.data.message,
                life: 3000,
            })
        }
    }

    return (
        <form 
            className="md:-mt-4 flex flex-col justify-center mx-auto items-center"
            onSubmit={handleSubmit}
        >
            <h2 className="font-semibold text-2xl font-rubik">
                { t('registration') }
            </h2>
            <p className="mt-4">
                { t('pleaseFill') }
            </p>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-envelope !ml-2"> </InputIcon>
                <InputText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailAddress')}
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-phone !ml-2"> </InputIcon>
                <InputText 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t('phoneNumber')}
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-lock !ml-2"> </InputIcon>
                <InputText
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder={t('password')}
                    type="password"
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <IconField iconPosition="left" className='!mt-6'>
                <InputIcon className="pi pi-lock !ml-2"> </InputIcon>
                <InputText
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder={t('confirmPassword')}
                    type="password"
                    className='!w-72 lg:!w-96 !pl-11' 
                />
            </IconField>

            <div className='w-72 lg:w-96 text-xs md:text-sm mt-6 flex justify-between gap-6 items-center'>
                <div className="flex gap-2 items-center">
                    <Checkbox 
                        checked={checked}
                        onChange={(e) => setChecked(e.checked!)}
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
                type='submit'
                loading={loading}
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
                    to="/auth/login"
                    className='font-bold underline underline-offset-2 ml-2'
                >
                    { t('login') }
                </Link>
            </p>

            <Toast 
                ref={toast} 
                className='!text-sm !font-nunito'
                position='bottom-right'
                pt={{
                    message: { className: '!bg-white !shadow !rounded-md' },
                    content: { className: '!bg-white !shadow !rounded-md' },
                    summary: { className: '!font-extrabold' },
                    icon: { className: '!text-sm !w-6' }
                }}
            />
        </form>
    )
}

export default Register