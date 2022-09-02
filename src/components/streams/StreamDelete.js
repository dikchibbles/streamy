import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { deleteStream, findStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.findStream(this.props.match.params.id)
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id)
    }

    onDismiss = () => {
        history.push('/');
    }

    renderActions = () => {
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={this.onDelete}>Delete</button>
                <Link className="ui button" to="/">Cancel</Link>
            </React.Fragment>
        )
    }

    renderTitle = () => {
        if (!this.props.stream) return 'Are you sure you want to delete this stream?'
        return `Are you sure you want to delete the stream with title "${this.props.stream.title}"?`
    }
    
    render () {
        return (
            <Modal 
                onDismiss={this.onDismiss} 
                header="Delete" 
                content={this.renderTitle()} 
                actions={this.renderActions()}
            /> 
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { deleteStream, findStream })(StreamDelete);
