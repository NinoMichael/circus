import React, { useState } from "react"
import { Badge } from "primereact/badge"
import { Menu } from "primereact/menu"
import { Link } from "react-router-dom"
import { useLanguage } from "../../context/LanguageContext"
import { InputSwitch } from "primereact/inputswitch"

import logo from '../../images/logo/logo.png'

const Dashmenu = () => {
    const { t } = useLanguage()

    const [checked, setChecked] = useState(false);

    const itemRenderer = (item) => (
        <div className='p-menuitem-content ms-4'>
            <Link className="flex align-items-center p-menuitem-link hover:bg-amber-300 mb-2 rounded" to={item.url}>
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto font-poppins" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 border text-xs p-1">{item.shortcut}</span>}
            </Link>
        </div>
    )

    let items = [
        {
            template: () => {
                return (
                    <div className="bg-slate-900">
                        <img src={logo} alt="Logo" width={150} height={150} className="w-24 h-24 mx-auto" />
                    </div>
                )
            }
        },
        {
            separator: true
        },
        {
            items: [
                {
                    label: t('dashboard'),
                    icon: 'pi pi-chart-bar',
                    template: itemRenderer,
                    url: '/dashboard-coop'
                },
                {
                    label: t('trip'),
                    icon: 'pi pi-compass',
                    template: itemRenderer,
                    url: '/trip-coop'
                },
                {
                    label: 'Bus',
                    icon: 'pi pi-car',
                    template: itemRenderer,
                    url: '/bus-coop'
                },
                {
                    label: t('driver'),
                    icon: 'pi pi-user',
                    template: itemRenderer,
                    url: '/driver-coop'
                },
                {
                    label: t('inbox'),
                    icon: 'pi pi-inbox',
                    badge: 2,
                    template: itemRenderer
                },
                {
                    label: t('setting'),
                    icon: 'pi pi-cog',
                    template: itemRenderer
                },
                {
                    label: t('logout'),
                    icon: 'pi pi-sign-out',
                    template: itemRenderer
                }
            ]
        },
        {
            template: () => {
                return (
                    <>
                        <div className="flex justify-center space-x-6 mt-12">
                            <i className="pi pi-sun mt-2"></i>
                            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                            <i className="pi pi-moon mt-2"></i>
                        </div>
                        <p className="text-[0.65em] text-center mt-6">{t('copyright')}</p>
                    </>
                )
            }
        },
    ]

    return (
        <div className="fixed float-left -mt-1">
            <Menu model={items} className="w-64 font-poppins text-sm border border-none shadow-xl h-[100vh]" />
        </div>
    )
}

export default Dashmenu