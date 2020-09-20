import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            favoriteList: []
        }
    }

    componentDidMount() {
        const favoriteList = JSON.parse(localStorage.getItem('favoriteData'));

        favoriteList && this.setState({ favoriteList });
    }

    render() {
        const { favoriteList } = this.state;

        return (
            <>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">首頁</Link>
                        </li>
                    </ul>
                </nav>
                <div>我的最愛</div>

                <VideoContainer>
                    {
                        favoriteList.map((e) => {
                            return (
                                <VideoItem
                                    key={e.id}
                                >
                                    <Video
                                        to={{
                                            pathname: '/video',
                                            state: { videoId: e.id }
                                        }}
                                    >
                                        {
                                            e.snippet.thumbnails.standard ?
                                                <img src={e.snippet.thumbnails.standard.url} />
                                                :
                                                <img src={e.snippet.thumbnails.default.url} />
                                        }
                                    </Video>

                                    <Content>
                                        <ContentLink
                                            to={{
                                                pathname: '/video',
                                                state: { videoId: e.id }
                                            }}
                                        >
                                            <Title>{e.snippet.localized.title}</Title>
                                            <Description>{e.snippet.localized.description}</Description>
                                        </ContentLink>

                                        <Plus onClick={() => this.handleAddFavorite(e)}>
                                            <img src="https://www.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png" />
                                        </Plus>
                                    </Content>
                                </VideoItem>
                            );
                        })
                    }
                </VideoContainer>
            </>
        );
    }
}

export default Favorite;

const VideoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const VideoItem = styled.div`
    margin: 0 10px;
    width: 25%;
    max-width: 320px;
    color: #000;

    a {
        text-decoration: none;
        color: inherit;
    }

    img {
        display: block;
        width: 100%;
    }
`;

const Video = styled(Link)`
    display: block;
`;

const Title = styled.p`
    line-height: 20px;
    display: -webkit-box;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Description = styled.p`
    line-height: 20px;
    display: -webkit-box;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContentLink = styled(Link)`
    display: block;
    width: calc(100% - 50px);
`;

const Plus = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #000;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    cursor: pointer;
`;