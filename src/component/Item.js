import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleAddFavorite = this.handleAddFavorite.bind(this);
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

    render() {
        return (
            <>
                <VideoContainer>
                    {
                        this.props.videoList.map((e) => {
                            return (
                                <VideoItem
                                    key={e.id}
                                >
                                    <Video
                                        to={{
                                            pathname: '/video',
                                            state: {
                                                videoId: e.id,
                                                title: e.snippet.localized.title,
                                                description: e.snippet.localized.description
                                            }
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
                                                state: {
                                                    videoId: e.id,
                                                    title: e.snippet.localized.title,
                                                    description: e.snippet.localized.description
                                                }
                                            }}
                                        >
                                            <Title>{e.snippet.localized.title}</Title>
                                            <Description>{e.snippet.localized.description}</Description>
                                        </ContentLink>

                                        <Plus onClick={() => this.handleAddFavorite(e)}>
                                            +
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

export default Item;

const VideoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

    @media (max-width: 1024px) {
        width: 50%;
    }

    @media (max-width: 768px) {
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
    color: #FFF;
`;

const ContentLink = styled(Link)`
    display: block;
    width: calc(100% - 50px);
`;

const Plus = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #FFF;
    width: 50px;
    height: 50px;
    background-color: #FFF;
    color: #181818;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        background-color: #181818;
        color: #FFF
    }
`;