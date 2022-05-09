import {Dialog, Input, Icon} from '@rneui/themed';
import {useState} from 'react';
import {addCategory} from '../services/CategoriesService';

export const AddCategoryDialog = props => {
  const [name, setName] = useState('');

  const saveCategory = async () => {
    try {
      await addCategory(name);
      props.toggleVisible();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      isVisible={props.visible}
      onBackdropPress={() => props.toggleVisible()}
    >
      <Dialog.Title title="Add a new category" />
      <Input
        placeholder="Name"
        leftIcon={<Icon name="title" />}
        onChangeText={val => setName(val)}
      />
      <Dialog.Actions>
        <Dialog.Button title="SAVE" onPress={() => saveCategory()} />
        <Dialog.Button title="CANCEL" onPress={() => props.toggleVisible()} />
      </Dialog.Actions>
    </Dialog>
  );
};
