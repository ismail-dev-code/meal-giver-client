
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import RestaurantDashboard from './RestaurantDashboard';
import CharityDashboard from './CharityDashboard';
import useUserRole from '../../../../hooks/useUserRole';
import Forbidden from '../../../../components/Forbidden';
import Loading from '../../../../components/MealGiver/Loading';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'restaurant'){
        return <RestaurantDashboard></RestaurantDashboard>
    }
    else if(role ==='charity'){
        return <CharityDashboard></CharityDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;