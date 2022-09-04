import React from "react";
import { connect } from "react-redux";
import { findStream } from "../../actions";
import flv from "flv.js";

class StreamShow extends React.Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.findStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.flvPlayer.destroy();
    }

    buildPlayer = () => {
        if (this.flvPlayer || !this.props.stream) {
            return;
        }

        const {id} = this.props.match.params

        this.flvPlayer = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();
    }


    renderStream = () => {
        if (!this.props.stream) return 'Loading...'
        const { title, description } = this.props.stream
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls={true}/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }

    render () {
        return (
            <div>{this.renderStream()}</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { findStream })(StreamShow);