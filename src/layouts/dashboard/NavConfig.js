// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Petugas',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Monitor',
    path: '/dashboard/monitor',
    icon: getIcon('eva:monitor-fill'),
  },
  {
    title: 'Aspirasi',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
];

export default navConfig;
