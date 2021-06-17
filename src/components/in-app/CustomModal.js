import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { deleteBlogPostAction, cancelDeleteBlogPostAction, modalInfoAction, updateBlogPostAction, cancelUpdateBlogPostAction } from '../../redux/actions';

class CustomModal extends React.Component {

    render() {
        return (
            <Modal open={Object.keys(this.props.modalInfo).length !== 0 ? true : false}>
                <Modal.Header>{this.props.modalInfo.modalMessage}</Modal.Header>
                <Modal.Actions>
                    <button onClick={() => this.props[this.props.modalInfo.yesAction]()}>
                        Yes
                    </button>
                    <button onClick={() => { this.props.modalInfoAction({}) && this.props[this.props.modalInfo.noAction]() }}>
                        Cancel
                    </button>
                </Modal.Actions>
            </Modal>
        )
    }
};

const mapStateToProps = state => {
    return {
        modalInfo: state.modalInfo,
    }
};

export default connect(mapStateToProps, { deleteBlogPostAction, modalInfoAction, cancelDeleteBlogPostAction, updateBlogPostAction, cancelUpdateBlogPostAction })(CustomModal);