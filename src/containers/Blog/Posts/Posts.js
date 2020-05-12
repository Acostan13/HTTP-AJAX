import React, { Component } from 'react';

import Post from '../../../components/Post/Post'
import axios from '../../../axios'
import './Posts.css'

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'AC'
                    }
                })
                this.setState({
                    posts: updatedPosts
                    // console.log(response)
                })
            })
            .catch(error => {
                console.log(error)
                // this.setState({
                //     error: true
                // })
            })
    }

    postSelectedHandler(id) {
        this.setState({
            selectedPostId: id
        })
    }
    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    author={post.author}
                    key={post.id}
                    clicked={() => this.postSelectedHandler(post.id)}
                    title={post.title} />
            })
        }
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;