import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
`;

export const ProductList = styled(FlatList).attrs({
  numColumns: 2,
})`
  padding: 0 10px;
`;

export const Product = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
`;

export const ProductImage = styled.Image`
  height: 122px;
  width: 122px;
  align-self: center;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
  margin-top: 10px;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #e83f5b;
`;

export const ProductButton = styled.TouchableOpacity``;