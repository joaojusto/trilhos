import Navbar from './index.svelte';
import * as Icons from '../Icon/index.svelte';

export default {
  title: 'Navbar',
  component: Navbar,
  argTypes: {
    navigateTo: { action: 'onClick' },
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: Navbar,
  props: args,
  on: {
    click: onClick,
  },
});

const ROUTES = [
  { name: 'Home', component: null, icon: Icons.Home },
  { name: 'Search', component: null, icon: Icons.Search },
  { name: 'Start', component: null, icon: Icons.Start },
  { name: 'Routes', component: null, icon: Icons.Tracks },
  { name: 'Profile', component: null, icon: null },
];

export const Default = Template.bind({});
Default.args = {
  routes: ROUTES,
  active: ROUTES[0].name,
};
