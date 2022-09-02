import streams from "../apis/streams";
import history from "../history";
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM, 
    FIND_STREAM, 
    FETCH_STREAMS,
    EDIT_STREAM,
    DELETE_STREAM
} from "./types";


export const signIn = (id) => {
    return {
        type: SIGN_IN,
        payload: id
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}


export const createStream = (formValues) => async (dispatch, getState) => {
    const { userID } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userID });
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    });
    history.push('/');
}

export const findStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
        type: FIND_STREAM,
        payload: response.data
    })
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    })
    history.push('/');
}

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({
        type: DELETE_STREAM,
        payload: id
    })
    history.push('/');
}


