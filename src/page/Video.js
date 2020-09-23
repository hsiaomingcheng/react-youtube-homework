import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import NavLink from '../component/NavLink';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const url = this.props.location.state ?
            `https://www.youtube.com/embed/${this.props.location.state.videoId}`
            :
            'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';

        return (
            <>
                <NavLink />

                <Container>
                    <ReactPlayer
                        url={url}
                        controls={true}
                    />

                    {
                        this.props.location.state && <Content>
                            <Title>{this.props.location.state.title}</Title>
                            <Description>{this.props.location.state.description}</Description>
                        </Content>
                    }
                </Container>
            </>
        );
    }
}

export default Video;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Content = styled.div`
    width: 100%;
    max-width: 640px;
`;

const Title = styled.p`
    margin-bottom: 20px;
    font-size: 26px;
`;

const Description = styled.p`
    white-space: break-spaces;
`;