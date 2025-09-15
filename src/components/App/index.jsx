import React from 'react';
import { Route, Routes } from 'react-router';
import Error401 from '../../Pages/Errors/401';
import Error404 from '../../Pages/Errors/404';
import ProtectedRoute from '../../utils/ProtectRoute';

import Root from '../../root/Public';
import RootUser from '../../root/User';
import RootAdmin from '../../root/Superadmin';
import RootSuperadmin from '../../root/Admin';

import routes from '../../routes';

function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route element={<Root />}>
                {routes.map((route) => {
                    if (route.role === null) {
                        const ElementRoute = route.element;
                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={<ElementRoute />}
                            />
                        );
                    }
                    return null;
                })}
            </Route>

            {/* User routes */}
            <Route element={<RootUser />}>
                {routes.map((route) => {
                    if (route.role?.includes('user')) {
                        const ElementRoute = route.element;
                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={
                                    <ProtectedRoute allowedRoles={route.role}>
                                        <ElementRoute />
                                    </ProtectedRoute>
                                }
                            />
                        );
                    }
                    return null;
                })}
            </Route>

            {/* Admin routes */}
            <Route element={<RootAdmin />}>
                {routes.map((route) => {
                    if (route.role?.includes('admin')) {
                        const ElementRoute = route.element;
                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={
                                    <ProtectedRoute allowedRoles={route.role}>
                                        <ElementRoute />
                                    </ProtectedRoute>
                                }
                            />
                        );
                    }
                    return null;
                })}
            </Route>

            {/* Superadmin routes */}
            <Route element={<RootSuperadmin />}>
                {routes.map((route) => {
                    if (route.role?.includes('superadmin')) {
                        const ElementRoute = route.element;
                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={
                                    <ProtectedRoute allowedRoles={route.role}>
                                        <ElementRoute />
                                    </ProtectedRoute>
                                }
                            />
                        );
                    }
                    return null;
                })}
            </Route>

            <Route path="/not-authorized" element={<Error401 />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default App;
