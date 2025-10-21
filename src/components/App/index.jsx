import { Route, Routes } from 'react-router-dom';
import Error404 from '@/pages/Errors/404';
import Root from '@/root/Public';
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
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default App;
