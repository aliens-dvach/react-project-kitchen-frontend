import Editor from '../../Editor/Editor';
import Home from '../../Home';
import Login from '../../Login';
import ProfileFavorites from '../../ProfileFavorites';
import Register from '../../Register';
import Settings from '../../Settings';
import ProfileDefault from '../../Profile';
import Article from '../../Article';

export const publicRouters = [
  { path: '/', component: Home, exact: true },
  { path: '/login', component: Login, exact: false },
  { path: '/register', component: Register, exact: false },
  { path: '/article/:id', component: Article, exact: false },
  { path: '/@:username/favorites', component: ProfileFavorites, exact: false },
  { path: '/@:username', component: ProfileDefault, exact: false },
];

export const privateRouters = [
  { path: '/editor/:slug', component: Editor, exact: false },
  { path: '/settings', component: Settings, exact: false },
];
