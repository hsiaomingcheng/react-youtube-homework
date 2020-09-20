import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            videoList: [],
            nextPageToken: '',
            prevPageToken: '',
        };

        this.handleAddFavorite = this.handleAddFavorite.bind(this);
    }

    authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({ scope: 'https://www.googleapis.com/auth/youtube.readonly' })
            .then(function () { console.log('Sign-in successful'); },
                function (err) { console.error('Error signing in', err); });
    }

    loadClient() {
        gapi.client.setApiKey('AIzaSyBcGnixINjOizgXo1a2c7y8yghgxSt7RcI');
        return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
            .then(function () { console.log('GAPI client loaded for API'); },
                function (err) { console.error('Error loading GAPI client for API', err); });
    }

    handleExcute(pageToken) {
        return gapi.client.youtube.videos.list({
            'part': [
                'snippet,contentDetails,statistics'
            ],
            'chart': 'mostPopular',
            'maxResults': 12,
            'regionCode': 'TW',
            'pageToken': pageToken,
        })
            .then((response) => {
                // Handle the results here (response.result has the parsed body).
                this.setState({
                    videoList: response.result.items,
                    nextPageToken: response.result.nextPageToken,
                    prevPageToken: response.result.prevPageToken
                });
            },
                function (err) { console.error('Execute error', err); });
    }

    handleAddFavorite(item) {
        // 點擊加入我的最愛按鈕

        const favoriteList = JSON.parse(localStorage.getItem('favoriteData'));
        let list = [];

        // 若localStorage無favoriteData資料 就直接加入
        if (!favoriteList) {
            list = [item];
        } else {
            let idExist = 0;

            // 判斷item的id是否與favoriteData裡的每筆資料重複，藉由此判斷影片是否已加入我的最愛
            favoriteList.forEach((e) => {
                if (e.id === item.id) {
                    idExist = -1;
                    return;
                }
            });

            if (idExist === -1) {
                return;
            }

            list = favoriteList ? [...favoriteList, item] : [item];
        }

        localStorage.setItem('favoriteData', JSON.stringify(list));
    }

    async makeRequest() {
        await gapi.auth2.init({ client_id: '19449219422-tm5rku1riaue8gu1bh0d8dn5qgbr5r18.apps.googleusercontent.com' });

        await this.authenticate().then(this.loadClient);

        await this.handleExcute();
    }

    componentDidMount() {
        gapi.load('client:auth2', () => {
            this.makeRequest();
        });
    }

    render() {
        const { videoList, nextPageToken, prevPageToken } = this.state;
        console.log('videoList', videoList);
        return (
            <>
                <nav>
                    <ul>
                        <li>
                            <Link to="/favorite">我的最愛</Link>
                        </li>
                    </ul>
                </nav>

                <div style={{ display: 'flex' }}>
                    <PageButton onClick={() => this.handleExcute(prevPageToken)}>{'<'}</PageButton>
                    <PageButton onClick={() => this.handleExcute(nextPageToken)}>{'>'}</PageButton>
                </div>

                <VideoContainer>
                    {
                        videoList.map((e) => {
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

export default Home;

const PageButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #000;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    cursor: pointer;
`;

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