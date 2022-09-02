import React from "react";
import { connect } from "react-redux";
import { findStream } from "../../actions";

class StreamShow extends React.Component {
    componentDidMount() {
        this.props.findStream(this.props.match.params.id);
    }


    renderStream = () => {
        if (!this.props.stream) return 'Loading...'
        const { title, description } = this.props.stream
        return (
            <div>
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