// src/pages/patients/BolalarNeuroxirurgiyasi.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Languages } from '@/context/LanguageContext';
import img1 from '@/assets/images/escafocefalia-no-operada-nino.jpg';
import img2 from '@/assets/images/trigonocefalia.jpg';
import T from '@/language/index.json';

/* ===================== Reusable UI bits ===================== */
function Accordion({ title, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="w-full">
            <button
                onClick={() => setOpen((v) => !v)}
                className="cursor-pointer w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-left"
            >
                <span className="font-bold text-[#2464AE] text-md md:text-lg leading-snug">
                    {title}
                </span>
                <FiChevronDown
                    className={`text-slate-500 dark:text-slate-300 transition-transform ${
                        open ? 'rotate-180' : ''
                    }`}
                    size={18}
                />
            </button>

            {open && (
                <div className="mt-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 md:p-5 shadow-sm">
                    {children}
                </div>
            )}
        </div>
    );
}

function SectionTitle({ as = 'h3', children }) {
    const common = 'text-slate-900 dark:text-white font-semibold';
    const map = {
        h2: `text-base md:text-[15px] ${common}`,
        h3: `text-sm md:text-[14px] ${common}`,
        h4: `text-[13px] ${common}`,
    };
    const Tag = as;
    return <Tag className={`${map[as]} mt-3 mb-2`}>{children}</Tag>;
}
function P({ children }) {
    return (
        <p className="text-[13.5px] md:text-[14px] leading-7 text-slate-700 dark:text-slate-300 mb-3">
            {children}
        </p>
    );
}
function HR() {
    return (
        <hr className="my-3 border-0 h-px bg-gradient-to-r from-sky-400/40 via-indigo-400/30 to-pink-400/30" />
    );
}
function OL({ children }) {
    return (
        <ol className="list-decimal pl-5 space-y-2 text-[13.5px] md:text-[14px] text-slate-700 dark:text-slate-300">
            {children}
        </ol>
    );
}
function LI({ children }) {
    return <li>{children}</li>;
}

/* ===================== Page ===================== */
const BolalarNeuroxirurgiyasi = () => {
    const { language } = Languages();
    const t = T[language] ?? T.uz;

    return (
        <section className="py-10 md:py-12 bg-slate-50 dark:bg-slate-900">
            <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px]">
                {/* Page header */}
                <div className="mb-7 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        {t.pageTitle}
                    </h1>
                    <p className="mt-2 text-[13.5px] md:text-[14px] text-slate-600 dark:text-slate-300">
                        {t.pageSubtitle}
                    </p>
                </div>

                <div className="space-y-4">
                    {/* 1) Lipomyelomeningocele */}
                    <Accordion title={t.lipo.title} defaultOpen={true}>
                        <SectionTitle as="h2">{t.lipo.h2}</SectionTitle>
                        <HR />

                        <SectionTitle as="h3">{t.lipo.whatH3}</SectionTitle>
                        <P>{t.lipo.whatP1}</P>

                        <HR />
                        <SectionTitle as="h3">{t.lipo.whyH3}</SectionTitle>
                        <P>{t.lipo.whyP1}</P>
                        <OL>
                            {t.lipo.whyL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.lipo.symptomsH3}</SectionTitle>
                        <P>{t.lipo.symptomsP1}</P>
                        <SectionTitle as="h4">{t.lipo.symptomsH4}</SectionTitle>
                        <OL>
                            {t.lipo.sL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.lipo.diagH3}</SectionTitle>
                        <P>{t.lipo.diagP1}</P>

                        <HR />
                        <SectionTitle as="h3">{t.lipo.treatH3}</SectionTitle>
                        <P>{t.lipo.treatP1}</P>
                        <SectionTitle as="h4">{t.lipo.stepsH4}</SectionTitle>
                        <OL>
                            {t.lipo.steps.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>
                        <P>{t.lipo.treatP2}</P>

                        <HR />
                        <SectionTitle as="h3">{t.lipo.contactH3}</SectionTitle>
                        <P>
                            {t.lipo.contactP1}{' '}
                            <a
                                href="tel:+998990749630"
                                className="inline-flex items-center gap-2 rounded-lg border border-sky-600/30 bg-sky-600/10 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300"
                            >
                                {t.lipo.phoneBtn}
                            </a>
                        </P>
                        <P>{t.lipo.contactP2}</P>
                    </Accordion>

                    {/* 2) Craniosynostosis */}
                    <Accordion title={t.cranio.title} defaultOpen={false}>
                        <SectionTitle as="h2">{t.cranio.h2}</SectionTitle>
                        <P>{t.cranio.pIntro}</P>

                        <div className="flex flex-col md:flex-row items-center gap-4 my-3">
                            <img
                                src={img1}
                                alt={t.cranio.imgsAlt2}
                                className="rounded-lg border border-slate-200 dark:border-slate-700 w-full md:w-1/2"
                            />
                            <img
                                src={img2}
                                alt={t.cranio.imgsAlt1}
                                className="rounded-lg border border-slate-200 dark:border-slate-700 w-full md:w-1/2"
                            />
                        </div>

                        <HR />
                        <SectionTitle as="h3">{t.cranio.sympH3}</SectionTitle>
                        <OL>
                            {t.cranio.symp.map((blk, i) => (
                                <LI key={i}>
                                    <strong>{blk.strong}</strong>{' '}
                                    {blk.items ? (
                                        <OL>
                                            {blk.items.map((s, j) => (
                                                <LI key={j}>{s}</LI>
                                            ))}
                                        </OL>
                                    ) : (
                                        blk.tail
                                    )}
                                </LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.cranio.diagH3}</SectionTitle>
                        <P>{t.cranio.diagP}</P>
                        <OL>
                            {t.cranio.diagL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.cranio.treatH3}</SectionTitle>
                        <P>{t.cranio.treatP}</P>

                        <SectionTitle as="h4">{t.cranio.treatH4a}</SectionTitle>
                        <P>{t.cranio.treatPa}</P>

                        <SectionTitle as="h4">{t.cranio.treatH4b}</SectionTitle>
                        <P>{t.cranio.treatPb}</P>
                        <OL>
                            {t.cranio.treatL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <P>{t.cranio.afterP}</P>

                        <HR />
                        <SectionTitle as="h3">{t.cranio.whyH3}</SectionTitle>
                        <OL>
                            {t.cranio.whyL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">
                            {t.cranio.contactH3}
                        </SectionTitle>
                        <P>
                            {t.cranio.contactLead}{' '}
                            <a
                                href="tel:+998990749630"
                                className="inline-flex items-center gap-2 rounded-lg border border-sky-600/30 bg-sky-600/10 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300"
                            >
                                {t.cranio.phoneBtn || '+998 99 074 96 30'}
                            </a>
                        </P>
                        <P>{t.cranio.contactP2}</P>
                    </Accordion>

                    {/* 3) Hydrocephalus */}
                    <Accordion title={t.hydro.title} defaultOpen={false}>
                        <SectionTitle as="h2">{t.hydro.h2}</SectionTitle>

                        <SectionTitle as="h3">{t.hydro.whatH3}</SectionTitle>
                        <P>{t.hydro.whatP}</P>

                        <HR />
                        <SectionTitle as="h3">{t.hydro.causesH3}</SectionTitle>
                        <OL>
                            {t.hydro.causes.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.hydro.appearH3}</SectionTitle>
                        <P>{t.hydro.appearP}</P>
                        <OL>
                            {t.hydro.appearL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.hydro.diagH3}</SectionTitle>
                        <P>{t.hydro.diagP}</P>
                        <OL>
                            {t.hydro.diagL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.hydro.treatH3}</SectionTitle>
                        <P>{t.hydro.treatLead}</P>
                        <OL>
                            {t.hydro.treatL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>
                        <P>{t.hydro.note}</P>

                        <HR />
                        <SectionTitle as="h3">{t.hydro.whyH3}</SectionTitle>
                        <OL>
                            {t.hydro.whyL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.hydro.contactH3}</SectionTitle>
                        <P>
                            {t.hydro.contactLead}{' '}
                            <a
                                href="tel:+998990749630"
                                className="inline-flex items-center gap-2 rounded-lg border border-sky-600/30 bg-sky-600/10 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300"
                            >
                                {t.hydro.phoneBtn}
                            </a>
                        </P>
                        <P>{t.hydro.contactP2}</P>
                    </Accordion>

                    {/* 4) Cephalohematoma */}
                    <Accordion title={t.ceph.title} defaultOpen={false}>
                        <SectionTitle as="h2">{t.ceph.h2}</SectionTitle>

                        <SectionTitle as="h3">{t.ceph.qH3}</SectionTitle>
                        <P>{t.ceph.qP1}</P>
                        <P>{t.ceph.qP2}</P>
                        <P>{t.ceph.qP3}</P>

                        <HR />
                        <SectionTitle as="h3">{t.ceph.whyH3}</SectionTitle>
                        <P>{t.ceph.whyP}</P>
                        <OL>
                            {t.ceph.whyL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.ceph.signsH3}</SectionTitle>
                        <P>{t.ceph.signsP}</P>
                        <OL>
                            {t.ceph.signsL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.ceph.diagH3}</SectionTitle>
                        <P>{t.ceph.diagP}</P>
                        <OL>
                            {t.ceph.diagL.map((x, i) => (
                                <LI key={i}>{x}</LI>
                            ))}
                        </OL>

                        <HR />
                        <SectionTitle as="h3">{t.ceph.treatH3}</SectionTitle>
                        <P>{t.ceph.treatP1}</P>
                        <P>{t.ceph.treatP2}</P>
                        <P>{t.ceph.treatP3}</P>
                        <P>{t.ceph.causeNote}</P>

                        <HR />
                        <SectionTitle as="h3">{t.ceph.contactH3}</SectionTitle>
                        <P>
                            {t.ceph.contactLead}{' '}
                            <a
                                href="tel:+998990749630"
                                className="inline-flex items-center gap-2 rounded-lg border border-sky-600/30 bg-sky-600/10 px-2.5 py-1.5 font-semibold text-sky-700 dark:text-sky-300"
                            >
                                {t.ceph.phoneBtn}
                            </a>
                        </P>
                        <P>{t.ceph.contactP2}</P>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default BolalarNeuroxirurgiyasi;
