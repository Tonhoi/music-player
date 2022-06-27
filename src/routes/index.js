import { router } from '../config';
import Discovery from '../pages/Discovery';
import Home from '../pages/Home';
import Hub from '../pages/Hub';
import MusicNew from '../pages/MusicNew';
import PlayList from '../pages/PlayList';
import Top100 from '../pages/Top100';

const PriviteRoute = [];
const PublicRoute = [
    { path: router.configRouter.home, element: Home },
    { path: router.configRouter.playlist, element: PlayList },
    { path: router.configRouter.discovery, element: Discovery },
    { path: router.configRouter.hub, element: Hub },
    { path: router.configRouter.top100, element: Top100 },
    { path: router.configRouter.moiPhatHanh, element: MusicNew },
];

export { PriviteRoute, PublicRoute };
