// src/pages/departments/PatNeuroOncology.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

/* ---------- Reusable UI helpers (Tailwind-only) ---------- */
function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="w-full">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-left"
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
const SectionTitle = ({ as = 'h3', children }) => {
    const base = 'text-slate-900 dark:text-white font-semibold';
    const map = {
        h2: `text-base md:text-[15px] ${base}`,
        h3: `text-sm md:text-[14px] ${base}`,
        h4: `text-[13px] ${base}`,
    };
    const Tag = as;
    return <Tag className={`${map[as]} mt-3 mb-2`}>{children}</Tag>;
};
const P = ({ children }) => (
    <p className="text-[13.5px] md:text-[14px] leading-7 text-slate-700 dark:text-slate-300 mb-3">
        {children}
    </p>
);
const HR = () => (
    <hr className="my-3 border-0 h-px bg-gradient-to-r from-sky-400/40 via-indigo-400/30 to-pink-400/30" />
);
const OL = ({ children }) => (
    <ol className="list-decimal pl-5 space-y-2 text-[13.5px] md:text-[14px] text-slate-700 dark:text-slate-300">
        {children}
    </ol>
);
const LI = ({ children }) => <li>{children}</li>;

/* ---------- Page ---------- */
const PatNeuroOncology = () => {
    return (
        <section className="py-10 md:py-12 bg-slate-50 dark:bg-slate-900">
            <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-5xl xl:max-w-[1150px] 2xl:max-w-[1400px]">
                {/* Page header */}
                <div className="mb-7 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        Neyroxirurgiya
                    </h1>
                    <p className="mt-2 text-[13.5px] md:text-[14px] text-slate-600 dark:text-slate-300">
                        Kontent ixcham tipografiya, raqamli ro‘yxatlar va bir
                        xil uslubda — qolgan sahifalarga ham oson ko‘chiriladi.
                    </p>
                </div>

                {/* Accordions */}
                <div className="space-y-4">
                    {/* 1. Новообразование головного мозга */}
                    <Accordion
                        title="Новообразование головного мозга"
                        defaultOpen={true}
                    >
                        <SectionTitle as="h2">
                            Новообразование головного мозга
                        </SectionTitle>
                        <P>
                            Новообразование головного мозга — патологический
                            процесс, при котором клетки мозга начинают
                            неконтролируемо делиться, образуя опухоль. Опухоли
                            бывают доброкачественными или злокачественными,
                            первичными (из тканей мозга/его оболочек) или
                            вторичными (метастазы из других органов).
                            Встречаемость — около 10–15 случаев на 100&nbsp;000
                            населения. Опухоли могут возникать в любом возрасте.
                            Рост объёмного образования в ограниченном
                            пространстве черепа приводит к сдавлению мозга,
                            поэтому даже доброкачественная опухоль способна
                            вызывать тяжёлое состояние.
                        </P>

                        <HR />
                        <SectionTitle as="h3">
                            Основные характеристики
                        </SectionTitle>

                        <SectionTitle as="h4">Классификация</SectionTitle>
                        <P>
                            <strong>Доброкачественные опухоли</strong>
                        </P>
                        <OL>
                            <LI>Растут медленно.</LI>
                            <LI>Обычно имеют чёткие границы.</LI>
                            <LI>Реже инфильтрируют окружающие ткани.</LI>
                            <LI>Примеры: менингиома, аденома гипофиза.</LI>
                        </OL>

                        <P>
                            <strong>Злокачественные опухоли</strong>
                        </P>
                        <OL>
                            <LI>Растут быстро.</LI>
                            <LI>Инфильтрируют окружающие ткани.</LI>
                            <LI>Часто приводят к нарушениям функций мозга.</LI>
                            <LI>
                                Примеры: глиобластома, анапластическая
                                астроцитома.
                            </LI>
                        </OL>

                        <SectionTitle as="h4">Виды</SectionTitle>
                        <P>
                            <strong>По локализации</strong>
                        </P>
                        <OL>
                            <LI>
                                Внемозговые — из оболочек мозга или питающих
                                сосудов.
                            </LI>
                            <LI>
                                Внутримозговые:
                                <OL>
                                    <LI>субтенториальные;</LI>
                                    <LI>супратенториальные;</LI>
                                    <LI>полушарные;</LI>
                                    <LI>опухоли срединных структур;</LI>
                                    <LI>опухоли основания мозга.</LI>
                                </OL>
                            </LI>
                        </OL>
                        <P>
                            <strong>По происхождению</strong>
                        </P>
                        <OL>
                            <LI>Первичные и вторичные (метастатические).</LI>
                            <LI>
                                Первичные по клеткам-источникам: астроцитарные,
                                нейрональные, эмбриональные, сосудистые и др.
                            </LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">
                            Клинические проявления
                        </SectionTitle>
                        <OL>
                            <LI>
                                Головные боли (чаще утром, усиливаются при
                                наклоне).
                            </LI>
                            <LI>
                                Тошнота и рвота (не связаны с приёмом пищи).
                            </LI>
                            <LI>Эпилептические припадки.</LI>
                            <LI>Нарушения зрения, слуха или речи.</LI>
                            <LI>
                                Психические/когнитивные изменения (память,
                                поведение).
                            </LI>
                            <LI>
                                Очаговая неврологическая симптоматика (слабость,
                                координация, парезы).
                            </LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">Причины развития</SectionTitle>
                        <P>
                            Точные причины не определены: обсуждается роль
                            ионизирующего излучения, токсинов, экологии. У детей
                            возможны врождённые новообразования (нарушения
                            внутриутробного развития). Черепно-мозговые травмы
                            могут запускать или активизировать процесс. Часть
                            опухолей возникает после лучевой терапии,
                            иммуносупрессии, при ВИЧ-инфекции; есть
                            наследственная предрасположенность.
                        </P>
                        <P>
                            Около 10–30% опухолей — метастатические (клетки
                            приносятся кровью/реже лимфой). Около 60% таких
                            опухолей — множественные. Чаще всего в мозг
                            метастазируют:
                        </P>
                        <OL>
                            <LI>
                                у мужчин — рак лёгких, колоректальный рак, рак
                                почки;
                            </LI>
                            <LI>
                                у женщин — рак груди, меланома, колоректальный и
                                лёгочный рак.
                            </LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">Диагностика</SectionTitle>
                        <OL>
                            <LI>
                                Магнитно-резонансная томография (МРТ) — наиболее
                                информативный метод.
                            </LI>
                            <LI>
                                Компьютерная томография (КТ) — для быстрой
                                оценки.
                            </LI>
                            <LI>Биопсия — верификация типа опухоли.</LI>
                            <LI>
                                Электроэнцефалография (ЭЭГ) — при судорожных
                                приступах.
                            </LI>
                            <LI>ПЭТ-КТ — оценка метаболической активности.</LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">Лечение</SectionTitle>
                        <OL>
                            <LI>
                                Хирургическое вмешательство — полное/частичное
                                удаление.
                            </LI>
                            <LI>
                                Лучевая терапия — разрушение опухолевых клеток.
                            </LI>
                            <LI>
                                Химиотерапия — подавление роста опухоли
                                препаратами.
                            </LI>
                        </OL>

                        <HR />
                        <SectionTitle as="h3">Профилактика</SectionTitle>
                        <P>В целом включает:</P>
                        <OL>
                            <LI>Здоровый образ жизни.</LI>
                            <LI>
                                Оптимальные физические нагрузки (по возможности
                                на свежем воздухе).
                            </LI>
                            <LI>Полноценный отдых.</LI>
                            <LI>
                                Отказ от вредных привычек (у курильщиков и при
                                злоупотреблении алкоголем риск опухолей мозга ↑
                                почти на 30%).
                            </LI>
                            <LI>Рацион, богатый овощами и фруктами.</LI>
                            <LI>
                                Ограничение стрессовых ситуаций или изменение
                                отношения к ним.
                            </LI>
                        </OL>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default PatNeuroOncology;
