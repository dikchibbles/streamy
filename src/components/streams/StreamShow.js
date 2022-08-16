import React from "react";
import { connect } from "react-redux";
import { findStream } from "../../actions";

class StreamShow extends React.Component {
    componentDidMount() {
        this.props.findStream(1);
    }
    render () {
        console.log(this.props.stream)
        return (
            <div>{this.props.stream[1] === undefined ? '' : this.props.stream[1].description}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { stream: state.streams }
}

export default connect(mapStateToProps, { findStream })(StreamShow);