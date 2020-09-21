import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../component/Item'

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

                {favoriteList && <Item videoList={favoriteList} />}
            </>
        );
    }
}

export default Favorite;