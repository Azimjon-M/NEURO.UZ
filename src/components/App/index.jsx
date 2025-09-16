import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error401 from '@/pages/Errors/401';
import Error404 from '@/pages/Errors/404';
import ProtectedRoute from '@/utils/ProtectRoute';

import Root from '@/root/Public';
import RootAdmin from '@/root/Superadmin';
import Login from '@/pages/Login';
import routes from '@/routes';

function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route element={<Root />}>
                {routes
                    .filter((route) => route.role === null)
                    
                    .map((route) => {
                        const parentRoute = route.element ? (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={route.element} 
                            />
                        ) : null;
                        const childRoutes = route.children?.map((child) => (
                            <Route
                                key={child.id}
                                path={child.path}
                                element={child.element} 
                            />
                        ));
                        return [parentRoute, childRoutes];
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

            <Route path="/login" element={<Login />} />
            <Route path="/not-authorized" element={<Error401 />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default App;
