import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'

const SummaryDialog = ({ load4, loading4 }) => (
    <>
        <h2 className="text-center text-lg font-kanit -mt-2">Détail de la réservation</h2>
        <p className="text-xs font-poppins text-center mt-1">Veuillez vérifier les informations que vous avez entré pour la réservation</p>

        <section className="mt-10 flex flex-row justify-center space-x-12 mx-6 overflow-hidden">
            <div>
                <h4 className="font-semibold text-sm font-poppins">Détails personnels</h4>
                <div className="border rounded p-3 mt-3">
                    <p className="font-poppins text-xs text-slate-500 -mt-1"><i className="pi pi-users me-3 mt-2"></i>Réservants</p>
                    <p className="font-poppins text-sm ms-8 font-semibold">3</p>
                </div>
                <div className="border rounded p-3 mt-2">
                    <p className="font-poppins text-xs text-slate-500 -mt-1"><i className="pi pi-users me-3 mt-2"></i>Places</p>
                    <p className="font-poppins text-sm ms-8 font-semibold">3</p>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-sm font-poppins">Résumé paiement</h4>
                <div className="border rounded p-3 mt-3">
                    <p className="font-poppins text-xs text-slate-500 -mt-1"><i className="pi pi-money-bill me-3 mt-2"></i>Total payé</p>
                    <p className="font-poppins text-sm ms-8 font-semibold">5000 F CFA</p>
                </div>
            </div>
        </section>

        <Divider className="w-40 mx-auto" />

        <Button label="Confirmer la réservation" icon="pi pi-check" className="border border-none outline outline-none font-poppins text-sm px-20 mt-8"
            onClick={load4} loading={loading4}
        />
    </>
)

export default SummaryDialog
