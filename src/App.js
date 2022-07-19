import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoute } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { useEffect } from 'react';
import { getChart, getLyric } from 'nhaccuatui-api-full/dist';

function App() {
    useEffect(() => {
        const fetchData = async () => {
            const res = await getChart();
            const res1 = await getLyric('fWcImHfhrtPV');
            console.log(res);
            console.log(res1);
        };
        fetchData();
    }, []);
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
