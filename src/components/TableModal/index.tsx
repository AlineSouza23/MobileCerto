import { useState } from 'react';
import { Modal, Platform, TouchableOpacity, View } from 'react-native';
import { Button } from '../Button';
import { Text } from '../Text';
import { Form, ModalBody, Overlay, Header, Input } from './styles';

type ITableModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({visible, onClose, onSave}: ITableModalProps) {

  const [table, setTable] = useState('');

  function handleSave(table: string) {
    setTable('');
    onSave(table);
    onClose();
  }

  return(
    
    <Modal animationType='fade' visible={visible} transparent>
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Para realizar uma reserva é necessário informar os campos abaixo:</Text>

            <TouchableOpacity  onPress={onClose}><Text>X</Text></TouchableOpacity>
          </Header>

          <Form>
            <Input placeholder='Nome' placeholderTextColor='#666' value={table} onChangeText={setTable}/>
      

            <Button disabled={table.length === 0} onPress={() => handleSave(table)}>Salvar</Button>
          </Form>

        </ModalBody>
      </Overlay>
    </Modal>
    
  );
}
