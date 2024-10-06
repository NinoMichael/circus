import { Button } from 'primereact/button';

const SelectionPayment = ({ paymentDatas, load3, loading3 }) => (
    <>
        <h2 className="text-center text-lg font-kanit">Veuillez sélectionner le mode de paiement</h2>
        <div className="grid grid-cols-4 mt-6 space-x-4">
            {paymentDatas.map((data) => (
                <div key={data.id} className="bg-white shadow rounded p-3 h-44 cursor-pointer">
                    <img src={data.img} alt="PaymentMethod" className="w-32 h-28" />
                    <p className="text-center text-sm mt-4 font-poppins">{data.intitule}</p>
                </div>
            ))}
        </div>
        <div className="flex flex-row justify-center space-x-4 w-full -ms-1">
            <Button label="Annuler" className="border border-none outline outline-none font-poppins text-sm px-20 mt-8 bg-slate-300" />
            <Button icon="pi pi-check" label="Suivant" className="border border-none outline outline-none font-poppins text-sm px-20 mt-8"
                onClick={load3} loading={loading3}
            />
        </div>
    </>
);

export default SelectionPayment
