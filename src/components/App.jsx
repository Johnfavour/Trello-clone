import React from 'react';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from '../actions'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import  './App.css'

const App = ({ lists }) => {
  const dispatch = useDispatch();
  
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type} = result;
    
    if (!destination) {
      return;
    }

    dispatch(
      sort (
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h3 style={{color:  '#fff'}}>Trello</h3>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            {lists.map((list, index) => (
              <TrelloList 
                listID={list.id} 
                key={list.id} 
                title={list.title} 
                cards={list.cards} 
                index={index}
              />
            ))}
            {provided.placeholder}
            <TrelloActionButton list />
            </ListContainer>
          )}
        </Droppable>
        
      </div>
    </DragDropContext>
  );
};

const ListContainer = styled.div `
  display: flex;
  flex-direction: row;
`


const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(App);

