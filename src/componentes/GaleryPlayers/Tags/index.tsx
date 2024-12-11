import React from 'react';
import styled from 'styled-components';
import tags from './tags.json';
import { useTranslation } from 'react-i18next';

const TagsContainer = styled.section`
    display: flex;
    align-items: center;
    gap: 64px;
    margin-top: 56px;
    margin-left: 4%;
`;

const TagTitulo = styled.h3`
    color: #D9D9D9;
    font-size: 30px;
    margin: 0;
`;

const Div = styled.div`
    display: flex;
    gap: 24px;
    justify-content: end;
`;

const Tag = styled.button`
    font-size: 24px;
    color: #FFFFFF;
    background: rgba(217, 217, 217, 0.3);
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    padding: 12px;
    box-sizing: border-box;
    border: 2px solid transparent;
    &:hover {
        background: red;
    }
`;

interface TagData {
    id: number; // Changed to number
    titulo: string;
}

const Tags: React.FC = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng)
    }
    return (
        <TagsContainer>
            <TagTitulo>{t('Search by Rank')}</TagTitulo>
            <Div>
                {tags.map((tag: TagData) => (
                    <Tag key={tag.id}>{tag.titulo}</Tag>
                ))}
            </Div>
        </TagsContainer>

        
    );
}

export default Tags;
