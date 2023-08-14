import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Formik, Form, Field, ErrorMessage } from "formik";


interface PostElementsProps {
    PostsData: Array<{
        message: string
        id: number
    }>;
    addPost(newPostText: string): void;
}


class MyPosts extends React.PureComponent<PostElementsProps> {
    render() {
    let PostElements = this.props.PostsData
        .map(p => <Post message={p.message} id={p.id} />)


    const onAddPost = (values: any) => {
        this.props.addPost(values.newPostText);
    }

    return (
        <div className={classes.posts}>
            MyPosts
            <AddPostForm onSubmit={onAddPost} />
            <div className={classes.posts}>
                {PostElements}
            </div>
        </div>

    )
    }
}


const AddPostForm = (props: any) => {

    const submit = (values: any, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void}) => {
        props.onSubmit(values);
    }

    return (
        <Formik
            initialValues={{ newPostText: "" }}
            onSubmit={(values, submitProps) => {
                props.onSubmit(values);
                submitProps.resetForm();
            }}
        >
            {({handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit}> 
                    <div>
                        <Field type={'text'} name={'newPostText'} placeholder={'Введите текст поста'} />
                    </div>
                    <ErrorMessage name="postText" component="div" />
                    <button type={'submit'} disabled={isSubmitting}>Опубликовать</button>
                </Form>
            )}
        </Formik>
    )
}

export default MyPosts;