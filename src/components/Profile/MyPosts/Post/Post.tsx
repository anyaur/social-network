import React from 'react';
import classes from './Post.module.css';

interface PostProps {
    id: number;
    message: string;
  }

const Post = (props: PostProps) => {
    return (
        <div className={classes.item}>
            <img src='https://sun9-54.userapi.com/impg/mezCpjLRnq0c6xrkv2qfVHpWF3CM3Xt5qlNx3g/B3J-o8TMsJc.jpg?size=2232x2160&quality=96&sign=4fd2db1b16b48cbbca46e3848223468d&type=album'>
            </img>
            {props.message}
        </div>
    )
}

export default Post;