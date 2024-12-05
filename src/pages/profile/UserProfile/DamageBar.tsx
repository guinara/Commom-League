import React from 'react';
import styled from '@emotion/styled';
import Tooltip from '@mui/material/Tooltip';

interface DamageBarProps {
  value: number; 
  maxValue: number; 
}

const Container = styled.div`
  width: 100px;
  background-color: #2b2a2a;
  height: 15px;
  position: absolute; 
  overflow: hidden;
  left: 320px;
  bottom: 12px;
`;

const Filled = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  background-color: #e70505;
  height: 100%;
  transition: width 0.3s ease-in-out; 
`;

const Text = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fdfdfd; 
  font-size: 1rem;
`;

const DamageBar: React.FC<DamageBarProps> = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100; 

  return (
    <Tooltip
    title={`Dano recebido de campeões: ${value}`}
    arrow
    sx={{ zIndex: 1 }} 
  >
      <Container>
        <Filled percentage={percentage} />
        <Text>{value}</Text> {}
      </Container>
    </Tooltip>
  );
};

export default DamageBar;
