import * as Components from  '../NavBarNew/component'
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';


const SideBar = () => {
    return(
        <Components.sideBarContainer>
                <Components.top>
                    <Components.logo className="logo" src="../.." alt="Logo do site"/>
                </Components.top>
                    <Components.hr></Components.hr>
                    <Components.center>
                    <Components.ulIcon>
                    <Components.Title>Main</Components.Title>
                    <Components.li>
                        <AdminPanelSettingsIcon/>
                        <Components.span>Administrativos</Components.span>
                    </Components.li>
                    <Components.li>
                        <AdminPanelSettingsIcon/>
                        <Components.span>Campeonatos</Components.span>
                    </Components.li>
                    <Components.li>
                        <AdminPanelSettingsIcon/>
                        <Components.span>Times</Components.span>
                    </Components.li>

                    <Components.Title>Listas</Components.Title>
                    <Components.li>
                        <AdminPanelSettingsIcon/>
                        <Components.span>Administrativos</Components.span>
                    </Components.li>
                    <Components.li>
                        <AdminPanelSettingsIcon/>
                        <Components.span>Campeonatos</Components.span>
                    </Components.li>
                    <Components.li>
                        <AdminPanelSettingsIcon/>
                        <Components.span>Times</Components.span>
                    </Components.li>
                    <Components.Title>Listas</Components.Title>
                        <Components.li>
                            <AdminPanelSettingsIcon/>
                            <Components.span>Configurações</Components.span>
                        </Components.li>
                        <Components.li>
                            <AdminPanelSettingsIcon/>
                            <Components.span>Campeonatos</Components.span>
                        </Components.li>

                        <Components.li>
                            <AdminPanelSettingsIcon/>
                            <Components.span>Times</Components.span>
                        </Components.li>
                    </Components.ulIcon>
                </Components.center>
                <Components.bottom>
                        <Components.colorOptions>Color options</Components.colorOptions>
                        <Components.colorOptions>Color options</Components.colorOptions>
                        <Components.colorOptions>Color options</Components.colorOptions>
                </Components.bottom>


            </Components.sideBarContainer>



    )



}

export default SideBar;