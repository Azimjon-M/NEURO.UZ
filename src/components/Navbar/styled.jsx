import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import routes from '../../routes';
import TextTranslate from '../../utils/TextTranslate';

const thisComponent = 'navbar';

// Animatsiyalar
const slideIn = keyframes`
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
`;

const slideOut = keyframes`
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-100%); opacity: 0; }
`;

// Stil berilgan menyu konteyneri
const MenuWrapper = styled.div`
    position: fixed;
    top: 64px;
    left: 0;
    width: 260px;
    height: calc(100vh - 64px);
    background: white;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    z-index: 50;
    animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.3s ease
        forwards;

    @media (min-width: 640px) {
        top: 72px;
        height: calc(100vh - 72px);
    }
`;

// Har bir menyu elementi uchun stil
const MenuLink = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    color: #374151;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;

    &.active {
        color: #2563eb; /* blue-600 */
        font-weight: 600;
    }

    &:hover {
        color: #1f2937;
    }
`;

// Kirish tugmasi
const LoginButton = styled(NavLink)`
    display: block;
    width: 100%;
    background-color: #f36523;
    color: white;
    text-align: center;
    padding: 0.5rem 1rem;
    margin-top: 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f35a23;
    }
`;

// Chiqish tugmasi
const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem 0;
    background: none;
    border: none;
    color: #374151;
    cursor: pointer;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
        color: #1f2937;
    }
`;

const MobileMenu = ({ isOpen, toggleMenu, isLoggedIn, setIsLoggedIn }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const menuRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Tashqariga bosilsa yopish
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                toggleMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleMenu]);

    if (!shouldRender) return null;

    return (
        <MenuWrapper $isOpen={isOpen} ref={menuRef}>
            <ul className="space-y-3">
                {routes.map((route) => {
                    if (route.hidden) return null;
                    const data = [thisComponent, route?.titleID];

                    return (
                        <li key={route.id}>
                            <MenuLink
                                to={route.path}
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                            >
                                <TextTranslate data={data} />
                            </MenuLink>
                        </li>
                    );
                })}
            </ul>

            {!isLoggedIn ? (
                <LoginButton to="/login" onClick={toggleMenu}>
                    Login
                </LoginButton>
            ) : (
                <>
                    <MenuLink to="/user-profile" onClick={toggleMenu}>
                        <TextTranslate data={[thisComponent, '10']} />
                    </MenuLink>
                    <LogoutButton
                        onClick={() => {
                            setIsLoggedIn(false);
                            toggleMenu();
                            localStorage.removeItem('isLoggedIn');
                        }}
                    >
                        <FiLogOut size={18} /> Logout
                    </LogoutButton>
                </>
            )}
        </MenuWrapper>
    );
};

export default MobileMenu;
