import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import './App.css'

const TrelloCard = ({text, id, index}) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
    {provided => (
    <CardContainer
    ref= {provided.innerRef} 
     {...provided.draggableProps} 
     {...provided.dragHandleProps}>
    
      <Card>
        <CardContent>
          <Typography 
            sx={{ fontSize: 13 }}
            gutterBottom>
            {text}
          </Typography>
        </CardContent>
      </Card>
    </CardContainer>
    
    )}
    </Draggable>
  )
}

const CardContainer = styled.div`
  margin-bottom: 9px;
`



export default TrelloCard