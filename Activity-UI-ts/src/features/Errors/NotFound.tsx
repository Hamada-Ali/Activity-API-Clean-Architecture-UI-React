import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder >
            <Header icon>
                <Icon name="search" />
                Oops - we've looked everywhere but we didn't find what you are looking for
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities">
                    Return To activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}