
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import * as Components from '../navBarSuperior/component'


const navBarSuperior = () => {
    return(
        <Components.bar>
            <Components.wrapper>
                <Components.search>
                    <Components.input placeholder='search...'/>
                    <SearchOutlinedIcon/>
                </Components.search>
                <Components.items>
                    <LanguageOutlinedIcon/>
                    English
                </Components.items>
                <Components.items>
                    <DarkModeOutlinedIcon/>
                </Components.items>

            </Components.wrapper>
        </Components.bar>
    )
}

export default navBarSuperior;