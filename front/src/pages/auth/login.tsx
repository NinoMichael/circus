
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { useState, useRef } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { useLanguage } from "../../context/LanguageContext"
import useAuth from '../../hooks/useAuth'

const Login = () => {
    const { t } = useLanguage()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ remembered, setRemembered ] = useState(false)
    const { login, loading, error } = useAuth()
    const toast = useRef<Toast>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = await login({ email, password })

        if (data) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
        }

        if (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Erreur',
                detail: error,
                life: 3000,
            })
        }
    }

    return (
        <form 
            className="md:-mt-8 flex flex-col justify-center mx-auto items-center"
            onSubmit={handleSubmit}
        >
            <h2 className="font-semibold text-2xl font-rubik">
                { t('welcomeBack') }
            </h2>
            <p className="mt-4">
                { t('pleaseEnter') }
            </p>

            <IconField iconPosition="left" className='!mt-8'>
                <InputIcon className="pi pi-envelope !ml-2"> </InputIcon>
                <InputText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder={t('emailAddress')}
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

            <div className='w-72 lg:w-96 text-xs md:text-sm mt-6 flex justify-between gap-6 items-center'>
                <div className="flex gap-2 items-center">
                    <Checkbox 
                        checked={remembered}
                        onChange={(e) => setRemembered(e.checked!)}
                    />
                    <label>{ t('rememberMe') }</label>
                </div>

                <Link 
                    to="/"
                    className='underline underline-offset-2 hover:text-amber-400'
                >
                    { t('forgottenPassword') }
                </Link>
            </div>

            <Button 
                label={t('login')}
                type="submit"
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
                { t('dontHave') }
                <Link 
                    to="/auth/register"
                    className='font-bold underline underline-offset-2 ml-2'
                >
                    { t('register') }
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

export default Login