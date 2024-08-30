import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../context/LanguageContext"
import NavigationMenu2 from "../../components/inc/NavigationMenu2"

const UseConditions = () => {
    const { t } = useLanguage()

    const threeFirst = [
        {
            id: 1,
            title: t('acceptConditionTitle'),
            text: t('acceptConditionP')
        },
        {
            id: 1,
            title: t('offerServiceTitle'),
            text: t('offerServiceP')
        },
        {
            id: 1,
            title: t('createAccountTitle'),
            text: t('createAccountP')
        },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NavigationMenu2 />

            <div className="mt-8 mx-36">
                <h1 className="font-kanit text-3xl">{t('conditionTitle')}</h1>
                <p className='mt-4'>{t("conditionP")}</p>

                {threeFirst.map((item, index) => (
                    <article key={index} className="mt-8 mb-4">
                        <h2 className="text-lg font-semibold">{item.id}. {item.title}</h2>
                        <p className="mt-3">{item.text}</p>
                    </article>
                ))}
            </div>

        </motion.div >
    )
}

export default UseConditions