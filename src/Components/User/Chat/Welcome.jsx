import React from 'react'
import styled from 'styled-components'

const Welcome = ({ currentUser }) => {
    const name = currentUser.firstName + " " + currentUser.lastName
    return (
        <Container>
            <h1>Welcome, <span>{name}!</span></h1>
            <h3>Please select a chat to start messaging</h3>
        </Container>
    )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  h1,h3 {
    color:#054D60;
  }
  span {
    color: #b31f1f;
  }
`;
export default Welcome