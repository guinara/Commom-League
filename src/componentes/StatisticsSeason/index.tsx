import React from 'react';
import { styled } from 'styled-components';
import Historic from '../../../components/Historic';
import * as Components from '../../profile/UserProfile/component';

const SideBanner = styled.section`
  position: relative;
  width: 35%;
  background-color: white;
  border: 1px solid white;
  color: black;
  transition: 1s;
  flex: 1;
  max-height: 400vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const StatisticsSeason: React.FC = () => {
  return (
    <SideBanner>
      {/* Primeira seção: Ranqueada Solo/Duo */}
      <div>
        <Components.textElo>Ranked Solo/Duo<Components.textRank>Gold 1</Components.textRank></Components.textElo>
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

      {/* Segunda seção: Common League */}
      <div>
        <Components.textElo>Common League<Components.textRank>Tier 1</Components.textRank></Components.textElo>
      </div>
      <Components.tagElo>
        <Components.textRankA>Season</Components.textRankA>
        <Components.textRankA>Team</Components.textRankA>
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

      {/* Terceira seção: Time em Atividade */}
      <Components.sideBarUserRiot>
        <Components.avatar>
          <Components.avatarA href="#"></Components.avatarA>
          <a href="#" className="icon">
            <Components.sideBarImg
              src="../../../../public/icones/g2esports.png"
              alt="User Image"
            />
          </a>
        </Components.avatar>
        <Components.sideBarTemaName>Active Team</Components.sideBarTemaName>
        <Components.sideBarTemaName2>G2</Components.sideBarTemaName2>
      </Components.sideBarUserRiot>

      {/* Jogadores do time */}
      <Components.sideBarUserRiot>
        <Components.avatar>
          <Components.avatarA href="#"></Components.avatarA>
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
          <Components.avatarA href="#"></Components.avatarA>
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
          <Components.avatarA href="#"></Components.avatarA>
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
          <Components.avatarA href="#"></Components.avatarA>
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
          <Components.avatarA href="#"></Components.avatarA>
          <a href="#" className="icon">
            <Components.sideBarImgRiot
              src="../../../../public/icones/02ce0f01a71141f89bd980d4fe81d7cb.webp"
              alt="User Image"
            />
          </a>
        </Components.avatar>
        <Components.sideBarUserRiotText>Ronaldo "Lucy"</Components.sideBarUserRiotText>
      </Components.sideBarUserRiot>

      <Historic />
    </SideBanner>
  );
};

export default StatisticsSeason;
