import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import NavLink from '../component/NavLink';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            isAdOpen: false
        }

        this.handleAdContainer = this.handleAdContainer.bind(this);
    }

    handleAdContainer() {
        const { isAdOpen } = this.state;

        this.setState({ isAdOpen: !isAdOpen });
    }

    render() {
        const { isAdOpen } = this.state;
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
                        onPause={() => this.handleAdContainer()}
                    />

                    {
                        this.props.location.state && <Content>
                            <Title>{this.props.location.state.title}</Title>
                            <Description>{this.props.location.state.description}</Description>
                        </Content>
                    }
                </Container>

                {
                    isAdOpen && <AdContainer>
                        <div style={{ position: 'relative' }}>
                            <AdButton
                                onClick={this.handleAdContainer}
                            >X</AdButton>
                            <img src="https://mrmad.com.tw/wp-content/uploads/2016/11/delete-iphone-advertising-messages.png" />
                        </div>
                    </AdContainer>
                }
            </>
        );
    }
}

export default Video;

const AdContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const AdButton = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
    width: 50px;
    height: 50px;
    color: #181818;
    cursor: pointer;
`;

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