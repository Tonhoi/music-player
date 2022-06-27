import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoute } from './routes';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {PublicRoute.map((route, index) => {
                        const Element = route.element;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Element />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
