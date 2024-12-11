import * as Components from '../navBar/component'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListIcon from '@mui/icons-material/List';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const App = () => {
        <Components.bar>
                <Components.wrapper>
                    <Components.search>
                        <Components.input placeholder='Search...'/>
                            <SearchIcon/>
                    </Components.search>
                    <Components.item>
                        <LanguageIcon/>
                        Português-BR
                    </Components.item>
                    <Components.item>
                        <DarkModeIcon/>
                    </Components.item>
                    <Components.item>
                        <FullscreenIcon/>
                    </Components.item>
                    <Components.item>
                        <CircleNotificationsIcon/>
                    </Components.item>
                    <Components.item>
                        <ChatBubbleOutlineOutlinedIcon/>
                    </Components.item>
                    <Components.item>
                        <ListIcon/>
                    </Components.item>
                </Components.wrapper>
        </Components.bar>
}

export default App;