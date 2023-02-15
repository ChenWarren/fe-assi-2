/**
 * This component is used to display the details of a post
 * 
 */

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams} from 'react-router-dom'
import { Post } from './PostsView'
import { Container, Box, Typography, Button, useTheme } from '@mui/material'
import NavigationBar from '../components/NavigationBar'


// Define the Comment interface
interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

// Define the User interface
interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

// Define the PostDetail component
const PostDetail = () => {
    // Use the useParams hook to get the id parameter from the URL
    const [searchParams, setSearchParams] = useSearchParams()
    const [post, setPost] = useState<Post>()
    const [comments, setComments] = useState<Comment[]>([])
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()
    const theme = useTheme()

    // Use the useEffect hook to fetch the post detail and comments with the post id from the API
    useEffect(()=> {
        const id = searchParams.get('id')
        const userID = searchParams.get('userID')
        axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
        .then(response => {
            setPost(response.data)
        })
        .catch( error => {
            console.log(error.message)
        })

        axios.get('https://jsonplaceholder.typicode.com/comments?postId='+id)
        .then(response => {
            setComments(response.data)
        })
        .catch( error => {
            console.log(error.message)
        })

        axios.get('https://jsonplaceholder.typicode.com/users/'+userID)
        .then(response => {
            setUser(response.data)
        })
        .catch( error => {
            console.log(error.message)
        })

    }, [])

    // Handle the back button click
    const handleBackClick = () => {
        navigate(-1)
    }


    return (
        <Container sx={{display: 'flex', justifyContent: 'center', mt: 9}}>
            <NavigationBar title='Post Details'/>
            {post && user && 
                <Box 
                    padding={theme.spacing(3)}
                    paddingX={theme.breakpoints.up('xs')? theme.spacing(6) : theme.spacing(0)}
                >
                    <Typography variant='h4' component='h1' sx={{paddingBottom: 3}}>
                        {post?.title}
                    </Typography>

                    <Typography variant='subtitle1' component='h5' color='gray'>
                        Name: {user?.name}
                    </Typography>
                    <Typography variant='subtitle2' component='h5' color='gray' marginBottom={1}>
                        Email: {user?.email}
                    </Typography>
                    
                    
                    <Typography variant='body1' component='p' marginBottom={3}>
                        {post?.body}
                    </Typography>

                    <Typography variant='h5' component='h2' sx={{paddingTop: 3, paddingBottom: 3}}>
                        Comments
                    </Typography>

                    {comments.map(comment => (
                        <Container key={comment.id}>
                            <Typography variant='h6' component='h5'>
                                Title: {comment.name}
                            </Typography>
                            <Typography variant='subtitle2' component='h5' color='gray' marginBottom={1}>
                                Email: {comment.email}
                            </Typography>
                            <Typography variant='body1' component='p' key={comment.id} marginBottom={3}>
                                {comment.body}
                            </Typography>
                        </Container>
                    ))}

                    {/* Back button */}
                    <Button sx={{mt: 4}} size='small' variant='outlined' color='primary' onClick={handleBackClick}>Back</Button>

                </Box>
            }
        </Container>
    )
}

export default PostDetail