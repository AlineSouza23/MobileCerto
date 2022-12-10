import {View, Modal, ActivityIndicator} from 'react-native'

type visibles = {
    visible: boolean;
  }


export default function Loading({visible}: visibles){
    return(
        <Modal transparent visible={visible}>
            <View>
            <ActivityIndicator
             size="large" 
             color={"black"} animating={true}
             style={{alignSelf: 'center',
             justifyContent: 'center',
              position: 'absolute', 
              alignItems: 'center', 
              top:450}}/>

            </View>
        </Modal>
    )
}