import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class NavLink extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <nav>
                <NavUl>
                    <NavLi>
                        <Link to="/">首頁</Link>
                    </NavLi>
                    <NavLi>
                        <Link to="/favorite">我的最愛</Link>
                    </NavLi>
                    <NavLi>
                        <Link to="/video">播放頁</Link>
                    </NavLi>
                </NavUl>
            </nav>
        );
    }
}

export default NavLink;

const NavUl = styled.ul`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    padding: 0;
`;

const NavLi = styled.li`
    margin: 0 10px;
    list-style: none;
    box-sizing: border-box;
    transition: all .3s ease;

    &:hover {
        transform: translateY(-6px);
    }

    a {
        padding: 10px;
        color: #FFF;
        text-decoration: none;
    }
`;