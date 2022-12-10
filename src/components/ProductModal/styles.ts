import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
  width: 100%;
  height: 350px;

  align-items: flex-end;

`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background: #FFFF;
  border-radius: 16px;

  align-items: center;
  justify-content: center;

  margin: 24px;
`;

export const ModalBody = styled.View`
  flex: 1;
  background-color: #fafafa;

  padding: 32px 24px 0;
`;
export const Header = styled.View`

`;


export const IngredientsContainer = styled.View`
 margin-top: 32px;
 flex: 1;
`;


export const Ingredient = styled.View`
  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 8px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const Footer = styled.View`
  min-height: 110px;
  background: #fff;

  padding: 16px 24px;
`;


export const FooterContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;


export const PriceContainer = styled.View`

`;
