import LoginScreen from './components/Registration/Login/LoginScreen';
import RegistrationScreen from './components/Registration/SignUp/RegistrationScreen';
import CodeScreen from './components/Registration/Code/CodeScreen';
import RPasswordScreen from './components/Registration/Password/ResetPasswordScreen';
import NPasswordScreen from './components/Registration/Password/NewPasswordScreen';
import HomeScreen from './components/Home/HomeScreen';
import FavouriteScreen from './components/Favourite/FavouriteScreen';
import ScanScreen from './components/Scan/ScanScreen';
import MapScreen from './components/Map/MapScreen';
import ProfileScreen from './components/Profile/ProfileScreen';
import BonusScreen from './components/Home/BonusScreen';
import InformationScreen from './components/Home/InformationScreen';
import NotificationScreen from './components/Favourite/NotificationScreen';
import ManualScreen from './components/Scan/ManualScreen';
import PaymentScreen from './components/Pay/PaymentScreen';
import CardScreen from './components/Pay/CardScreen';


const customFonts = {
    MRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    Oswald: require('./assets/fonts/Oswald.ttf'),
    SFRegular: require('./assets/fonts/SFPro-Regular.ttf'),
    SFMedium: require('./assets/fonts/SFPro-Medium.ttf'),
    SFSemiBold: require('./assets/fonts/SFPro-Semibold.ttf'),
    SFBold: require('./assets/fonts/SFPro-Bold.ttf'),
    OSRegular: require('./assets/fonts/OpenSans-Regular.ttf')
};

const authScreenConfigurations = [
    {
      name: "Login",
      component: LoginScreen,
    },
    {
      name: "Registration",
      component: RegistrationScreen,
    },
    {
      name: "Code",
      component: CodeScreen,
    },
    {
      name: "RPassword",
      component: RPasswordScreen,
    },
    {
      name: "NPassword",
      component: NPasswordScreen,
    },
    {
      name: "Home",
      component: HomeScreen,
    },
    {
      name: "Favourite",
      component: FavouriteScreen,
    },
    {
      name: "Scan",
      component: ScanScreen,
    },
    {
      name: "Map",
      component: MapScreen,
    },
    {
      name: "Profile",
      component: ProfileScreen,
    },
    {
      name: "Bonus",
      component: BonusScreen,
    },
    {
      name: "Information",
      component: InformationScreen
    },
    {
      name: "Notification",
      component: NotificationScreen
    },
    {
      name: "Manual",
      component: ManualScreen
    },
    {
      name: "Payment",
      component: PaymentScreen
    }, 
    {
      name: "Card",
      component: CardScreen
    }

];

const tabScreenConfigurations = [
  {
    name: "Головна",
    component: HomeScreen,
  },
  {
    name: "Улюблені",
    component: FavouriteScreen,
  },
  {
    name: "Сканувати",
    component: ScanScreen,
  },
  {
    name: "Мапа",
    component: MapScreen,
  },
  {
    name: "Профіль",
    component: ProfileScreen,
  },
  
];





export { customFonts, authScreenConfigurations, tabScreenConfigurations };