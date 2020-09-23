import React from 'react';
import Item from '../component/Item';
import NavLink from '../component/NavLink';

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
                <NavLink />

                {favoriteList && <Item videoList={favoriteList} />}
            </>
        );
    }
}

export default Favorite;