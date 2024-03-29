import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { FlatList, View, StyleSheet } from 'react-native';
import TaskTile from './TaskTile';
import TaskForm from './TaskForm';
import FloatingBtn from '../../components/FloatingBtn/FloatingBtn';
import Counter from '../../components/Counter/Counter';
import { useDispatch, useSelector } from "react-redux";
import { getTasks, toggleTask, deleteTask } from '../../redux/store';

const TaskScreen = () => {
  const tasks = useSelector(getTasks);
  const dispatch = useDispatch();
  const [formVisible, setFormVisble] = useState(false);

  const onDeleteTask = (id:any) =>{
    dispatch(deleteTask(id));
  }

  const renderItem = ({item}:any) =>{
    return <TaskTile 
              task={item} 
              onUpdateTask={updateTask} 
              onDeleteTask={onDeleteTask}
            />
  }

  const updateTask = (id:any) => {
    dispatch(toggleTask(id));
  }

  const _toggleForm = () =>{
    setFormVisble(!formVisible);
  }

  return (
    <>
        <FlatList 
            ListHeaderComponent={
            <>
              <Header />
              {formVisible && <TaskForm />}               
              <View style={styles.container}>
                <Counter nb={tasks.length} title='Toutes les taches' />
                <Counter nb={tasks.filter((t:any)=>t.isCompleted===true).length} title='Terminé' />
               </View>
            </>
          }
            contentContainerStyle={{ flexGrow:1}}
            data={tasks}
            keyExtractor={(item, index)=>index.toString()}
            renderItem={renderItem}
        />
        <FloatingBtn toggle={_toggleForm} open={formVisible} />
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:10,
    paddingHorizontal:20,
  },
});

export default TaskScreen