import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            )
        }
    }

    renderAdmin = (stream) => {
        if (stream.userID === this.props.currentUserID) {
            return (
                <div className="right floated content">
                    <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
                    <Link className="ui button negative" to={`/streams/delete/${stream.id}`}>Delete</Link>
                </div>
            )
        }
    }

    listAllStreams = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`streams/${stream.id}`} className="header">{stream.title}</Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    render () {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.listAllStreams()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams),
        currentUserID: state.auth.userID,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
