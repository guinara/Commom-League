import React from 'react';
import { styled } from 'styled-components';
import EstilosGlobais from '../../../componentes/GlobaStyle';
import Perfil from '../../../componentes/Perfil';
import UserList from '../../../componentes/userList';
import SideMenu from '../../../componentes/mainSideBar/SideMenu';
import { useState } from 'react';
import Header from '../../../componentes/MainHeader';
import * as Components from '../../profile/UserProfile/component';
import DamageBar from './DamageBar';
import TankBar from './tankBar';
import { useNavigate } from 'react-router-dom';
import Historic from '../../../componentes/Historic';



const Backgroundgradient = styled.main`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 8px solid var(--bgColor);
  display: flex;
  justify-content: space-between;
  gap: 30px;
  overflow: hidden;
  transition: 0.5s;
`;


const App: React.FC = () => {

  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleTogleActive = () => {
    setActive(!active);
  };

  const handleEditProfileClick = () => {
    navigate('/profiles/edit'); // A página para a qual deseja redirecionar
  };
  return (
    
    <Components.Main>
      
      <Backgroundgradient> 
        
      <SideMenu active={active} />
      
     

        <Components.Banner className={`banner ${active ? 'active' : ''}`}>
        <Header toggleActive={handleTogleActive} />
              <Components.UserBanner>
             
                              <Components.avatar>
                          <Components.avatarA href="#"> </Components.avatarA>
                          <a href="#" className="icon">
                            <Components.avatarImg
                              src="../../../../public/icones/malenia.png"
                              alt="User Image"
                            />
                          </a>
                        </Components.avatar>
                    
                    <Components.userName>kuskyn</Components.userName>
                      
                    
                      <Components.spanUserName>
                        Juan Ribeiro Rodrigues - São Paulo, São paulo, Brazil
                      
                        </Components.spanUserName>

                      <Components.spanlevelProfile>
                        Level: 30
                        </Components.spanlevelProfile>

                      <Components.editProfile onClick={handleEditProfileClick}>
                        Edit Profile
                      </Components.editProfile>

                      <Components.verificado> 
                      Verificado
                      </Components.verificado>


              </Components.UserBanner>

              <Historic />
              <Components.historicBanner>
            
                 
            <Components.teamTwo>
            <div>
            <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.teams2Img
                    src="../../../../public/icones/paiN.png"
                  alt="User Image"
                />
              </a>
            </Components.avatar>
                 <h3>PaiN Gaming - Derrota</h3>
           </div>
             <Components.player2>
        
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/ef761e30-7118-4749-9852-e7e989b6cea3.jpg" alt="" />
             <Components.imgTextOne>BepoIV</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
             </Components.player2>
             <Components.player2>
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/81f8f4ac-108f-4b08-9a54-b9999168982b.jpg" alt="" />
             <Components.imgTextOne>Shrimp</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
             </Components.player2>
             <Components.player2>
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/9cf8bbe7-56a3-4a1b-bdce-48c7ef6057b5.jpg" alt="" />
             <Components.imgTextOne>Faker</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

             </Components.player2>

             <Components.player2>
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/e873a5ac-4749-4531-8288-f611b64d4fe4.jpg" alt="" />
             <Components.imgTextOne>BRTT</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

             </Components.player2>

             <Components.player2>

             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/5a2f8000-6bc3-4bd9-aeaa-7554dfcf896e.jpg" alt="" />
             <Components.imgTextOne>Uzi</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
          

         
             </Components.player2>
          
             
            </Components.teamTwo>
            <Components.teamOne>
            <div>
            <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.teams2Img
                    src="../../../../public/icones/paiN.png"
                  alt="User Image"
                />
              </a>
            </Components.avatar>
                 <h3>Loud - Vitória</h3>
           </div>
             <Components.player>
               
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
           
             <Components.imgplayer src="https://www.listchallenges.com/f/items/1ba9a2d0-44ce-498c-bb0b-8fd4de802485.jpg" alt="" />
             <Components.imgTextOne>BepoIV</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

             </Components.player>
             <Components.player>
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/3d02ed6b342e1bd890e0b4736458cb2f490f0cb8-256x256.png" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/cefc5df7-9d38-4149-8caa-4af3c1092bf8.jpg" alt="" />

             <Components.imgTextOne>Shrimp</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
            
             </Components.player>
             <Components.player>
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://cdn.ome.lt/5TpgAUa52DGsC5r81IyMpG1eEaQ=/770x0/smart/uploads/conteudo/fotos/incendiar-thumb.jpg" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/fea7e241-cebe-4451-be0d-7f28a1ac0e38.jpg" alt="" />
             <Components.imgTextOne>Faker</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

             </Components.player>

             <Components.player>
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSteg5LMuski6JAsDVQ76BqgdLX44dLTAAs4Q&s" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg" alt="" />
             <Components.imgTextOne>BRTT</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

             </Components.player>

             <Components.player>
             <Components.spellsDiv>
             <Components.imgSpellOneTeamOne src="https://cdn.ome.lt/5TpgAUa52DGsC5r81IyMpG1eEaQ=/770x0/smart/uploads/conteudo/fotos/incendiar-thumb.jpg" alt="" />
             <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
             </Components.spellsDiv>
             <Components.imgplayer src="https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg" alt="" />
             <Components.imgTextOne>Luci</Components.imgTextOne>
             <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

             </Components.player>
             
             
            </Components.teamOne>
            
            
           
         </Components.historicBanner>

         <Components.historicBanner>
       
            
       <Components.teamTwo>
       <div>
       <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.teams2Img
                    src="../../../../public/icones/paiN.png"
                  alt="User Image"
                />
              </a>
            </Components.avatar>
            <h3>PaiN Gaming - Derrota</h3>
      </div>
        <Components.player2>
   
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/ef761e30-7118-4749-9852-e7e989b6cea3.jpg" alt="" />
        <Components.imgTextOne>BepoIV</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
        </Components.player2>
        <Components.player2>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/81f8f4ac-108f-4b08-9a54-b9999168982b.jpg" alt="" />
        <Components.imgTextOne>Shrimp</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
        </Components.player2>
        <Components.player2>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/9cf8bbe7-56a3-4a1b-bdce-48c7ef6057b5.jpg" alt="" />
        <Components.imgTextOne>Faker</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player2>

        <Components.player2>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/e873a5ac-4749-4531-8288-f611b64d4fe4.jpg" alt="" />
        <Components.imgTextOne>BRTT</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player2>

        <Components.player2>

        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/5a2f8000-6bc3-4bd9-aeaa-7554dfcf896e.jpg" alt="" />
        <Components.imgTextOne>Uzi</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
             <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
             <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
     

    
        </Components.player2>
     
        
       </Components.teamTwo>
       <Components.teamOne>
       <div>
       <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.teams2Img
                    src="../../../../public/icones/paiN.png"
                  alt="User Image"
                />
              </a>
            </Components.avatar>
            <h3>Loud - Vitoria</h3>
      </div>
        <Components.player>
          
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
      
        <Components.imgplayer src="https://www.listchallenges.com/f/items/1ba9a2d0-44ce-498c-bb0b-8fd4de802485.jpg" alt="" />
        <Components.imgTextOne>BepoIV</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player>
        <Components.player>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/3d02ed6b342e1bd890e0b4736458cb2f490f0cb8-256x256.png" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/cefc5df7-9d38-4149-8caa-4af3c1092bf8.jpg" alt="" />

        <Components.imgTextOne>Shrimp</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
        </Components.player>
        <Components.player>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://cdn.ome.lt/5TpgAUa52DGsC5r81IyMpG1eEaQ=/770x0/smart/uploads/conteudo/fotos/incendiar-thumb.jpg" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/fea7e241-cebe-4451-be0d-7f28a1ac0e38.jpg" alt="" />
        <Components.imgTextOne>Faker</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player>

        <Components.player>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSteg5LMuski6JAsDVQ76BqgdLX44dLTAAs4Q&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg" alt="" />
        <Components.imgTextOne>BRTT</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player>

        <Components.player>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://cdn.ome.lt/5TpgAUa52DGsC5r81IyMpG1eEaQ=/770x0/smart/uploads/conteudo/fotos/incendiar-thumb.jpg" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg" alt="" />
        <Components.imgTextOne>Luci</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player>
        
        
       </Components.teamOne>
       
      
    </Components.historicBanner>
    <Components.historicBanner>
       
            
       <Components.teamTwo>
       <div>
       <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.teams2Img
                    src="../../../../public/icones/paiN.png"
                  alt="User Image"
                />
              </a>
            </Components.avatar>
            <h3>PaiN Gaming - Derrota</h3>
            
      </div>
        <Components.player2>
   
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/ef761e30-7118-4749-9852-e7e989b6cea3.jpg" alt="" />
        <Components.imgTextOne>BepoIV</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
        </Components.player2>
        <Components.player2>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/81f8f4ac-108f-4b08-9a54-b9999168982b.jpg" alt="" />
        <Components.imgTextOne>Shrimp</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
        </Components.player2>
        <Components.player2>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/9cf8bbe7-56a3-4a1b-bdce-48c7ef6057b5.jpg" alt="" />
        <Components.imgTextOne>Faker</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player2>

        <Components.player2>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/e873a5ac-4749-4531-8288-f611b64d4fe4.jpg" alt="" />
        <Components.imgTextOne>BRTT</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player2>

        <Components.player2>

        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/5a2f8000-6bc3-4bd9-aeaa-7554dfcf896e.jpg" alt="" />
        <Components.imgTextOne>Uzi</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
     

    
        </Components.player2>
     
        
       </Components.teamTwo>
       <Components.teamOne>
   
       <div>
       <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.teams2Img
                    src="../../../../public/icones/paiN.png"
                  alt="User Image"
                />
              </a>
            </Components.avatar>
            <h3>Loud - Vitória</h3>
      </div>
        <Components.player>
          
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
      
        <Components.imgplayer src="https://www.listchallenges.com/f/items/1ba9a2d0-44ce-498c-bb0b-8fd4de802485.jpg" alt="" />
        <Components.imgTextOne>BepoIV</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player>
        <Components.player>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/3d02ed6b342e1bd890e0b4736458cb2f490f0cb8-256x256.png" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/cefc5df7-9d38-4149-8caa-4af3c1092bf8.jpg" alt="" />

        <Components.imgTextOne>Shrimp</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
       
        </Components.player>
        <Components.player>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://cdn.ome.lt/5TpgAUa52DGsC5r81IyMpG1eEaQ=/770x0/smart/uploads/conteudo/fotos/incendiar-thumb.jpg" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/fea7e241-cebe-4451-be0d-7f28a1ac0e38.jpg" alt="" />
        <Components.imgTextOne>Faker</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player>

        <Components.player>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSteg5LMuski6JAsDVQ76BqgdLX44dLTAAs4Q&s" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg" alt="" />
        <Components.imgTextOne>BRTT</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player>

        <Components.player>
        <Components.spellsDiv>
        <Components.imgSpellOneTeamOne src="https://cdn.ome.lt/5TpgAUa52DGsC5r81IyMpG1eEaQ=/770x0/smart/uploads/conteudo/fotos/incendiar-thumb.jpg" alt="" />
        <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
        </Components.spellsDiv>
        <Components.imgplayer src="https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg" alt="" />
        <Components.imgTextOne>Luci</Components.imgTextOne>
        <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

        </Components.player>
        
        
       </Components.teamOne>
       
       
      
    </Components.historicBanner>

    <Components.historicBanner>
  
       
  <Components.teamTwo>
    
  <div>
  <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.teams2Img
                    src="../../../../public/icones/paiN.png"
                  alt="User Image"
                />
              </a>
            </Components.avatar>
       <h3>PaiN Gaming - Derrota</h3>
 </div>
 
   <Components.player2>

   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/ef761e30-7118-4749-9852-e7e989b6cea3.jpg" alt="" />
   <Components.imgTextOne>BepoIV</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
   </Components.player2>
   <Components.player2>
   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/81f8f4ac-108f-4b08-9a54-b9999168982b.jpg" alt="" />
   <Components.imgTextOne>Shrimp</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
   </Components.player2>
   <Components.player2>
   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/9cf8bbe7-56a3-4a1b-bdce-48c7ef6057b5.jpg" alt="" />
   <Components.imgTextOne>Faker</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

   </Components.player2>

   <Components.player2>
   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/e873a5ac-4749-4531-8288-f611b64d4fe4.jpg" alt="" />
   <Components.imgTextOne>BRTT</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

   </Components.player2>

   <Components.player2>

   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/5a2f8000-6bc3-4bd9-aeaa-7554dfcf896e.jpg" alt="" />
   <Components.imgTextOne>Uzi</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
        <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
        <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}



   </Components.player2>

   
  </Components.teamTwo>
  <Components.teamOne>
  <div>
  <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.teams1Img
                  src="../../../../public/icones/SK_Telecom_T1logo_square.webp"
                  alt="User Image"
                />
              </a>
            </Components.avatar>
       <h3>SK Telecom T1 - Vitoria</h3>
 </div>
   <Components.player>
     
   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GStQ9zk3FCq2SyreKBwowl3O_EJh3mbceg&s" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
 
   <Components.imgplayer src="https://www.listchallenges.com/f/items/1ba9a2d0-44ce-498c-bb0b-8fd4de802485.jpg" alt="" />
   <Components.imgTextOne>BepoIV</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
   <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
   <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

   </Components.player>
   <Components.player>
   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/3d02ed6b342e1bd890e0b4736458cb2f490f0cb8-256x256.png" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/cefc5df7-9d38-4149-8caa-4af3c1092bf8.jpg" alt="" />

   <Components.imgTextOne>Shrimp</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
   <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
   <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}
   </Components.player>
   <Components.player>
   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://cdn.ome.lt/5TpgAUa52DGsC5r81IyMpG1eEaQ=/770x0/smart/uploads/conteudo/fotos/incendiar-thumb.jpg" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/fea7e241-cebe-4451-be0d-7f28a1ac0e38.jpg" alt="" />
   <Components.imgTextOne>Faker</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
   <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
   <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

   </Components.player>

   <Components.player>
   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSteg5LMuski6JAsDVQ76BqgdLX44dLTAAs4Q&s" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/9b760009-f606-4bbd-a62f-f3d76ee9c164.jpg" alt="" />
   <Components.imgTextOne>BRTT</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
   <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
   <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

   </Components.player>

   <Components.player>
   <Components.spellsDiv>
   <Components.imgSpellOneTeamOne src="https://cdn.ome.lt/5TpgAUa52DGsC5r81IyMpG1eEaQ=/770x0/smart/uploads/conteudo/fotos/incendiar-thumb.jpg" alt="" />
   <Components.imgSpellTwoTeamTwo src="https://pm1.aminoapps.com/6798/2ef8689840b9c0470f20bdaf81b9df4093df817fv2_00.jpg" alt="" />
   </Components.spellsDiv>
   <Components.imgplayer src="https://www.listchallenges.com/f/items/af96cd29-8be7-42bb-8aa6-6f855e4d1e50.jpg" alt="" />
   <Components.imgTextOne>Luci</Components.imgTextOne>
   <Components.kdaText1>9/2/17</Components.kdaText1>
   <DamageBar value={20000} maxValue={53000} /> {/* 75 de 100 */}
   <TankBar value={40000} maxValue={53000} /> {/* 75 de 100 */}

   </Components.player>
   
   
  </Components.teamOne>
  <Components.sideBanner>
                <div>
                      <Components.textElo>Ranqueada Solo/Duo<Components.textRank>Gold 1</Components.textRank></Components.textElo>
                </div>
               
                <Components.tagElo>
                      <Components.textRankA>Season</Components.textRankA>
                      <Components.textRankA>Division</Components.textRankA>
                      <Components.textRankA>LP</Components.textRankA>
                </Components.tagElo>
                 
                 <Components.tagEloinfo>
                  <div>
                  <li>S2024 S2</li>
                  <li>S2024 S1</li>
                  <li>S2023 S1</li>
                  </div>

                  <div>
                  <Components.tagEloinfoGold>Gold 3</Components.tagEloinfoGold>
                  <Components.tagEloinfoGrandMaster>Grand Master</Components.tagEloinfoGrandMaster>
                  <Components.tagEloinfoDiamond>Diamond</Components.tagEloinfoDiamond>
                  </div>

                  <div>
                  <li>54</li>
                  <li>180</li>
                  <li>2</li>
                  </div>
                 </Components.tagEloinfo>
                  
              </Components.sideBanner>

              <Components.sideBanner>
              <div>
                      <Components.textElo>Common League<Components.textRank>Tier 1</Components.textRank></Components.textElo>
                </div>
               
                <Components.tagElo>
                      <Components.textRankA>Season</Components.textRankA>
                      <Components.textRankA>Time</Components.textRankA>
                      <Components.textRankA>Tier</Components.textRankA>
                </Components.tagElo>
                 
                 <Components.tagEloinfo>
                  <div>
                  <li>2024S1</li>
                  <li>2024S2</li>
                  <li>2024S3</li>
                  </div>

                  <div>
                  <Components.tagEloinfoGold>PaiN</Components.tagEloinfoGold>
                  <Components.tagEloinfoGrandMaster>Team Liquid</Components.tagEloinfoGrandMaster>
                  <Components.tagEloinfoDiamond>PaiN</Components.tagEloinfoDiamond>
                  </div>

                  <div>
                  <li>1</li>
                  <li>3</li>
                  <li>1</li>
                  </div>
                 </Components.tagEloinfo>

              </Components.sideBanner>

              <Components.sideBanner>
                <Components.sideBarUserRiot>
                <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.sideBarImg
                  src="../../../../public/icones/g2esports.png"
                  alt="User Image"
                />
              </a>
           
            </Components.avatar>
            <Components.sideBarTemaName>Time em Atividade</Components.sideBarTemaName>
            <Components.sideBarTemaName2>G2</Components.sideBarTemaName2>       
                </Components.sideBarUserRiot>
                 
                 <Components.sideBarUserRiot>
                 
                  <Components.avatar>
              <Components.avatarA href="#"> </Components.avatarA>
              <a href="#" className="icon">
                <Components.sideBarImgRiot
                  src="../../../../public/icones/tuznsz5wucdb1.jpg"
                  alt="User Image"
                />
              </a>
           
            </Components.avatar>
            <Components.sideBarUserRiotText>Kuskyn "BepoIv"</Components.sideBarUserRiotText>
                 </Components.sideBarUserRiot>

                 <Components.sideBarUserRiot>
                 
                 <Components.avatar>
             <Components.avatarA href="#"> </Components.avatarA>
             <a href="#" className="icon">
               <Components.sideBarImgRiot
                 src="../../../../public/icones/a0866891c1a678c4831b36ddddab850c18173ee7-2560x2560.jpg"
                 alt="User Image"
               />
             </a>
          
           </Components.avatar>
           <Components.sideBarUserRiotText>Rennan "Cabo Taz"</Components.sideBarUserRiotText>
                </Components.sideBarUserRiot>

                <Components.sideBarUserRiot>
                 
                 <Components.avatar>
             <Components.avatarA href="#"> </Components.avatarA>
             <a href="#" className="icon">
               <Components.sideBarImgRiot
                 src="../../../../public/icones/Icon1.jpg"
                 alt="User Image"
               />
             </a>
          
           </Components.avatar>

           
           <Components.sideBarUserRiotText>kaique "Zash"</Components.sideBarUserRiotText>
                </Components.sideBarUserRiot>

                <Components.sideBarUserRiot>
                 
                 <Components.avatar>
             <Components.avatarA href="#"> </Components.avatarA>
             <a href="#" className="icon">
               <Components.sideBarImgRiot
                 src="../../../../public/icones/Blood-Moon-Jhin-Icon-Lol-Shop-99551931.webp"
                 alt="User Image"
               />
             </a>
          
           </Components.avatar>

           

           
           <Components.sideBarUserRiotText>Leonardo "M isato"</Components.sideBarUserRiotText>
                </Components.sideBarUserRiot>

                <Components.sideBarUserRiot>
                 
                 <Components.avatar>
             <Components.avatarA href="#"> </Components.avatarA>
             <a href="#" className="icon">
               <Components.sideBarImgRiot
                 src="../../../../public/icones/02ce0f01a71141f89bd980d4fe81d7cb.webp"
                 alt="User Image"
               />
             </a>
          
           </Components.avatar>

           

           
           <Components.sideBarUserRiotText>Ronaldo "Lucy"</Components.sideBarUserRiotText>
                </Components.sideBarUserRiot>
                  
                  
                  
            
                  

              </Components.sideBanner>

 
</Components.historicBanner>
            
    

           

        </Components.Banner>

        
      
      <EstilosGlobais />
      
     
      
    </Backgroundgradient>
    </Components.Main>
    
  );
};

export default App;
