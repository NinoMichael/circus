import { Outlet } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useLanguage } from '../context/LanguageContext'
import { goBack } from '../lib/functions'

import promo from "../assets/auth/img-promo.png"

const AuthLayout = () => {
    const { t } = useLanguage()

    return (
        <div className='overflow-x-hidden md:grid grid-cols-2 min-h-screen'>
            <div className='md:hidden bg-amber-400 h-24' />
            
            <div className="p-4 md:p-8">
                <Button 
                    icon="pi pi-arrow-left"
                    className='hover:!text-amber-400'
                    title={t('back')}
                    onClick={goBack}
                />
                <Outlet />
            </div>

            <div className='hidden md:block bg-amber-400 h-24 md:h-auto relative'>
                <div className='px-8 mt-8 flex justify-between items-center'>
                    <h3 className='w-96 text-2xl text-white font-bold font-rubik'>
                        Vos trajets régionaux commencent ici...
                    </h3>

                    <div className='w-24 h-6 rounded-full bg-white' />
                </div>

                <img 
                    src={promo}
                    alt="Man with luggage in bus station" 
                    className="w-96 absolute bottom-0 right-0"
                />
            </div>
        </div>
    )
}

export default AuthLayout