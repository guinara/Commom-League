import styled from 'styled-components';


interface SignInProps {
    $signinIn?: boolean;
    imageUrl?: string; 
}

export const Container = styled.div`

`;

export const SignUpContainer = styled.div<SignInProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => !props.$signinIn ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` : null}
    @media (max-width: 720px) {
      position: none;
          top: 0;
          height: 50%;
          width: 100%;
          transition: all 0.6s ease-in-out;
          left: none;
          width: none;
          opacity: none;
          z-index: 1;
      ${props => !props.$signinIn ? `
          transform: translateY(0);
          opacity: 1;
          z-index: 5;
  ` : null}
  }
`;

export const SignInContainer = styled.div<SignInProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => !props.$signinIn ? `transform: translateX(100%);` : null}
  @media (max-width: 720px) {
    height: 50%;
    width: 100%;

    ${props => !props.$signinIn ? `transform: translateX(0%);` : null}
  }
`;

export const Form = styled.form`
  background: linear-gradient(174.61deg, #141d26 4.16%, #1a2633 48%, #151515 96.76%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;

  @media (max-width: 720px) {

  
  }
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 2px black;
  color: white;

  @media (max-width: 720px) {


}
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 50%;

  @media (max-width: 720px) {
    background-color: #eee;
    border: none;
    padding: 3px 5px;
    margin: 8px 0;
    width: 50%;
}
`;

export const Select = styled.select`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 50%;
  font-size: 16px;

  @media (max-width: 720px) {
    background-color: #eee;
    border: none;
    padding: 3px 5px;
    margin: 8px 0;
    width: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Cor de foco */
    border-color: #007bff;
  }

  option {
    font-size: 16px;
    padding: 10px;
  }

  option:checked {
    background-color: #007bff; /* Cor de fundo quando a opção está selecionada */
    color: white;
  }
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ffffff;
  background-color: #e21203;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #ffffff;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div<SignInProps>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 0;
  ${props => !props.$signinIn ? `transform: translateX(-100%);` : null}
  @media (max-width: 720px) {
    left: 0;
    width: 100%;
    ${props => !props.$signinIn ? `transform: translateX(0);` : null}
}
`;

export const Overlay = styled.div<SignInProps>`
  background: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => !props.$signinIn ? `transform: translateX(50%);` : null}
  @media (max-width: 720px) {
    background: url(${props => props.imageUrl});
    height: 50%;
    width: 200%;
    top: 50%;
    transform: translateY(0);
    transition: transform 0.6s ease-in-out; // Cor diferente para telas menores
  }
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  @media (max-width: 720px) {
   
  }
`;

export const LeftOverlayPanel = styled(OverlayPanel)<SignInProps>`
  transform: translateX(-20%);
  ${props => !props.$signinIn ? `transform: translateX(0);` : null}
  @media (max-width: 720px) {
    ${props => !props.$signinIn ? `transform: translateX(100%);` : null}
  }
`;

export const RightOverlayPanel = styled(OverlayPanel)<SignInProps>`
  right: 0;
  transform: translateX(0);
  ${props => !props.$signinIn ? `transform: translateX(20%);` : null}
  @media (max-width: 720px) {
    ${props => !props.$signinIn ? `transform: translateX(200%);` : null}
  }
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  text-shadow: 1px 1px 2px black; 
`;
