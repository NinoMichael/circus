import { LuPhone, LuMail } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { useContact } from '../hooks/useContact';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


const Contact = () => {
    const toast = useRef<Toast>(null!);
    const { loading, name, email, subject, message, setName, setEmail, setSubject, setMessage, handleSubmit } = useContact(toast);

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4 md:p-8">
            <Toast ref={toast} position="bottom-right" />
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                        Contactez-nous
                    </h1>
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                        Vous avez une question sur Circus ? Contactez notre équipe
                        pour vos trajets régionaux.
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Nom</label>
                                <input
                                    type="text"
                                    placeholder="Votre nom complet"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-[#FFD633] focus:ring-2 bg-[#FEFEFE]"

                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Email</label>
                                <input
                                    type="email"
                                    placeholder="Votre@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-[#FFD633] focus:ring-2 bg-[#FEFEFE]"

                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Objet</label>
                            <input
                                type="text"
                                placeholder="Sujet de votre message"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-[#FFD633] focus:ring-2 bg-[#FEFEFE]"

                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Comment pouvons-nous vous aider ?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-[#FFD633] focus:ring-2 bg-[#FEFEFE]"

                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#FFD633] font-semibold px-8 py-3 rounded-lg hover:opacity-90 hover:scale-105 duration-300 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#FEFEFE] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-foreground mb-5">Nos coordonnées</h2>
                        <div className="space-y-5">
                            <div className="flex items-start gap-3">
                                <LuPhone className="text-[#FFD633] bg-[#FFD633]/10 p-2.5 rounded-sm w-10 h-10" />
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Téléphone</p>
                                    <p className="text-sm font-medium text-foreground">+261 34 00 000 00</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MdOutlineLocationOn className="text-[#FFD633] bg-[#FFD633]/10 p-2 rounded-sm w-10 h-10" />
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Adresse</p>
                                    <p className="text-sm font-medium text-foreground">Enceinte CCI, Ivato<br />Antananarivo, Madagascar</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <LuMail className="text-[#FFD633] bg-[#FFD633]/10 p-2.5 rounded-sm w-10 h-10" />
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Email</p>
                                    <p className="text-sm font-medium text-foreground">contact@circus.mg</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.281820278648!2d47.474740162497!3d-18.814226626613998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f081890f4829cd%3A0x88d7f3c627aab6b4!2sCCI%20IVATO!5e1!3m2!1sfr!2smg!4v1772746641905!5m2!1sfr!2smg"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localisation Circus"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;