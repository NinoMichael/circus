import { Outlet } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useLanguage } from '../context/LanguageContext'
import { goBack } from '../lib/functions'

import promo from "../assets/auth/img-promo.png"

const AuthLayout = () => {
    const { t } = useLanguage()

    return (
        <div className='flex flex-col-reverse md:grid grid-cols-2 h-screen'>
            <div className="p-4 md:p-8">
                <Button 
                    icon="pi pi-arrow-left"
                    className='hover:!text-amber-400'
                    title={t('back')}
                    onClick={goBack}
                />
                <Outlet />
            </div>

            <div className='bg-amber-400 h-24 md:h-auto relative'>
                <img 
                    src={promo}
                    alt="Man with luggage in bus station" 
                    className="hidden md:block w-96 absolute bottom-0 right-0"
                />
            </div>
        </div>
    )
}

export default AuthLayout