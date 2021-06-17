import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Transition } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { sendBlogPostIdAction, modalInfoAction, cancelUpdateBlogPostAction } from '../../redux/actions';
import CustomModal from '../in-app/CustomModal';
import { addDatabaseValue, updateDatabaseValue, databaseRef } from '../firebase/database/helperFunctions';
import Button from '../in-and-out-of-app/Button';
import styles from '../../styles/login.module.scss';

class BlogCreatorForm extends React.Component {
    state = { titleValue: '', contentValue: '', messages: [], validFields: [], visible: true }

    // Modules is an object specifying which React Quill features are enabled, and their configuration.
    // Default modules (available without specifying this modules object) include all below but strike,
    // blockquote and indent, so the object below just adds those features in
    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ],
    }

    componentDidUpdate(prevProps) {
        // triggered when user clicks edit post in archive
        // takes the id of the blogpost and makes a call to
        // server to obtain postTitle and -content
        if (prevProps.blogPostId !== this.props.blogPostId) {
            if (this.props.blogPostId !== '') {
                databaseRef('posts/' + this.props.blogPostId).on('value', ((snapshot) => {
                    if (snapshot.val()) {
                        this.setState({ titleValue: snapshot.val().postTitle, contentValue: snapshot.val().postContent })
                    }
                }))
            }
        }
        else if (prevProps.updateBlogPost !== this.props.updateBlogPost) {
            if (this.props.updateBlogPost) {
                let currentDateAndTime = moment().format('LLL');
                updateDatabaseValue('posts/' + this.props.blogPostId, { postTitle: this.state.titleValue, postContent: this.state.contentValue, updatedTimeStamp: currentDateAndTime })
                this.props.sendBlogPostIdAction('')
                this.props.modalInfoAction({})
                this.props.cancelUpdateBlogPostAction()
                this.setState({ titleValue: '', contentValue: '' })
            }
        }
    }

    saveBlogPost = () => {
        if (this.state.validFields.length === this.fields.length && this.state.messages.length === 0) {
            let authUID = this.props.user.uid;
            let currentDateAndTime = moment().format('LLL');
            addDatabaseValue('posts', {
                postTitle: this.state.titleValue,
                postContent: this.state.contentValue,
                postTimeStamp: currentDateAndTime,
                shareOnDashboard: false,
                userUID: authUID
            }).then(() => {
                let postStoreSuccessMessage =
                    <div className="ui success message message" onMouseLeave={() => this.setState({ visible: false })}>
                        Your blog post has been saved
                        </div>
                this.setState(prevState => ({ messages: [...prevState.messages, postStoreSuccessMessage], titleValue: '', contentValue: '' }))
            })
        }
    };

    updateBlogPost = () => {
        if (this.state.validFields.length === this.fields.length && this.state.messages.length === 0) {
            let modalInfo = {
                yesAction: 'updateBlogPostAction',
                noAction: 'cancelUpdateBlogPostAction',
                payload: this.props.blogPostId,
                modalMessage: 'Updating this post will overwrite its previous content. Are you sure you want to update this post?'
            }
            this.props.modalInfoAction(modalInfo)
        }
    };

    renderInputFields = () => {
        this.fields = [
            {
                label: 'Post Content',
                name: 'content',
                id: 1,
                message: <div className="ui error message">Post content cannot be left blank</div>,
                isValid: this.state.contentValue !== '' && this.state.contentValue !== '<p><br></p>' ? true : false,
                value: this.state.contentValue || ''
            }
        ]

        return this.fields.map((field) => {
            return (
                <div key={field.id} style={{ height: "375px", backgroundColor: "white", margin: "15px" }}>
                    <ReactQuill
                        theme="snow"
                        style={{ height: "300px", backgroundColor: "white", maxWidth: "750px"}}
                        message={field.message}
                        value={field.value}
                        onChange={(html) => {
                            let fieldName = `${field.name}Value`
                            this.setState({ [fieldName]: html })
                        }}
                        modules={this.modules}
                        placeholder="Start by writing a title for your post..."
                    />
                </div>
            )
        })
    };

    validate = (event) => {
        event.preventDefault();
        let validFields = [];
        let messages = [];
        this.fields.forEach(field => {
            if (field.isValid) {
                validFields.push(field.id)
            }
            else messages.push(field.message)
        });

        this.setState({ messages, validFields, visible: true },
            () => {
                this.props.blogPostId ? this.updateBlogPost() : this.saveBlogPost()
            })
    };

    render() {
        return (
            <div>
                <div>
                    <form className={styles.form} onSubmit={this.validate}>
                        <h4 className="ui dividing header">Blog Creator Form</h4>
                        {this.renderInputFields()}
                        <div style={{ margin: "15px" }}>
                            {this.props.blogPostId === '' ?
                                <button className="ui positive button" type="submit">
                                    Save Post
                            </button> :
                                <button className="ui positive button" type="submit">Update Post</button>}
                            <button className="ui button" type="reset"
                                onClick={() => {
                                    this.setState({ titleValue: '', contentValue: '', messages: [] })
                                    this.props.sendBlogPostIdAction('')
                                }}>
                                Cancel
                        </button>
                        </div>
                    </form>
                    {this.state.messages && this.state.messages.map((message) => {
                        return (
                            <Transition visible={this.state.visible} animation="scale" duration={500} key={this.state.messages.indexOf(message)}>
                                {message}
                            </Transition>
                        )
                    })}
                    <CustomModal />
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
        blogPostId: state.blogPostId,
        updateBlogPost: state.updateBlogPost
    }
};

export default connect(mapStateToProps, { sendBlogPostIdAction, modalInfoAction, cancelUpdateBlogPostAction })(BlogCreatorForm);