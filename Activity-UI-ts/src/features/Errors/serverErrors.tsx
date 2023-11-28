import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/store";
import { Container, Header, Segment } from "semantic-ui-react";

export default observer(function serverError() {
    const {CommonStore} = useStore()

    return (
        <Container>
            <Header as='h1' content='server error' />
            <Header sub as='h5' color="red" content={CommonStore.error?.message} />
            {CommonStore.error?.details && (
                <Segment>
                    <Header as='h4' content='Stack trace' color="teal" />
                    <code style={{marginTop: '10px'}}>{CommonStore.error.details}</code>
                </Segment>
            )}
        </Container>
    )
})