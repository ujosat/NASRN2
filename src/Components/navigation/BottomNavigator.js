import * as React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../Search';
import Cart from '../../../Pages/cart';
import Orders from '../../../Pages/orders';
import Profile from '../../../Pages/profile';
const Tab=createBottomTabNavigator();
function BottomNavigator()
{
    return(
            <Tab.Navigator>
                    <Tab.Screen name="Search" component={Search} options={{ headerShown: false }}/>
                    <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
                    <Tab.Screen name="Orders" component={Orders} options={{ headerShown: false }}/>
                    <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            </Tab.Navigator>
        )
}
export default BottomNavigator;