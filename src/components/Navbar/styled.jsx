import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import routes from '@/routes';
import TextTranslate from '@/utils/TextTranslate';
import { FaAngleRight } from 'react-icons/fa';

const thisComponent = 'navbar';
const cleanKey = (k) =>
    typeof k === 'string' && k.includes('.') ? k.split('.').pop() : k;
const T = ({ id, fallback }) => (
    <TextTranslate data={[thisComponent, cleanKey(id)]} fallback={fallback} />
);

// Animations
const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;
const slideOut = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
`;

const MenuWrapper = styled.div`
    position: fixed;
    top: 56px; /* mobile top bar height */
    left: 0;
    width: 280px;
    height: calc(100vh - 56px);
    background: white;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    z-index: 50;
    animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.3s ease
        forwards;

    @media (min-width: 1024px) {
        /* lg */
        display: none;
    }
`;

const MenuLink = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    color: #374151;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;

    &.active {
        color: #2563eb;
        font-weight: 600;
    }
    &:hover {
        color: #1f2937;
    }
`;

const ParentBtn = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    color: #374151;
    font-weight: 600;
    background: none;
    border: 0;
    text-align: left;
`;

const MobileMenu = ({ isOpen, toggleMenu }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [openIds, setOpenIds] = useState(() => new Set());
    const menuRef = useRef(null);

    useEffect(() => {
        if (isOpen) setShouldRender(true);
        else {
            const t = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                toggleMenu();
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, toggleMenu]);

    const toggleOpen = (id) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    if (!shouldRender) return null;

    return (
        <MenuWrapper $isOpen={isOpen} ref={menuRef}>
            <ul className="space-y-2">
                {routes.map((route) => {
                    if (route.hidden) return null;

                    // Parent with children → accordion
                    if (route.children?.length) {
                        const isOpenParent = openIds.has(route.id);
                        return (
                            <li key={route.id}>
                                <ParentBtn
                                    onClick={() => toggleOpen(route.id)}
                                    aria-expanded={isOpenParent}
                                >
                                    <FaAngleRight
                                        className={`transition-transform ${
                                            isOpenParent
                                                ? 'rotate-90'
                                                : 'rotate-0'
                                        }`}
                                    />
                                    <span>
                                        <T
                                            id={route.titleID}
                                            fallback={route.title}
                                        />
                                    </span>
                                </ParentBtn>

                                {isOpenParent && (
                                    <ul className="pl-6">
                                        {route.children.map((child) => (
                                            <li key={child.id}>
                                                <MenuLink
                                                    to={child.path}
                                                    onClick={toggleMenu}
                                                    className={({ isActive }) =>
                                                        isActive ? 'active' : ''
                                                    }
                                                >
                                                    <T
                                                        id={child.titleID}
                                                        fallback={child.title}
                                                    />
                                                </MenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    }

                    // Leaf
                    return (
                        <li key={route.id}>
                            <MenuLink
                                to={route.path}
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                            >
                                <T id={route.titleID} fallback={route.title} />
                            </MenuLink>
                        </li>
                    );
                })}
            </ul>
        </MenuWrapper>
    );
};

export default MobileMenu;
