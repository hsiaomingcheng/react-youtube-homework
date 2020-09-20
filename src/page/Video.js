import React from 'react';
import { Link } from 'react-router-dom';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        console.log('this.props.location.state.videoId', this.props.location.state.videoId);
        return (
            <>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">首頁</Link>
                        </li>
                        <li>
                            <Link to="/favorite">我的最愛</Link>
                        </li>
                    </ul>
                </nav>
                <iframe
                    src={`http://www.youtube.com/embed/${this.props.location.state.videoId}`}
                    type='text/html'
                    width='640'
                    height='360'
                    frameBorder='0'>
                </iframe>
            </>
        );
    }
}

export default Video;