/**
 * This component is used to display the details of a post
 * 
 */

import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams} from 'react-router-dom'
import { Container, Box, Typography, Button, useTheme } from '@mui/material'
import NavigationBar from '../components/NavigationBar'
import capitalizer from '../utils/capitalizer'
import { Post, Comment, User } from '../types/model.type'
import { dataService } from '../services/data.service'


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

        if(id){
            dataService.getPostById(id)
                .then(response => {
                    setPost(response.data)
                })
                .catch( error => {
                    console.log(error.message)
                })

            dataService.getCommentsByPostId(id)
                .then(response => {
                    setComments(response.data)
                })
                .catch( error => {
                    console.log(error.message)
                })
        }

        if(userID){
            dataService.getUserByUserId(userID)
                .then(response => {
                    setUser(response.data)
                })
                .catch( error => {
                    console.log(error.message)
                })
        }

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
                    <Typography variant='h4' component='h1' sx={{paddingBottom: 3, textTransform: 'capitalize'}}>
                        {post?.title}
                    </Typography>

                    <Typography variant='subtitle1' component='h5' color='gray'>
                        Name: {user?.name}
                    </Typography>
                    <Typography variant='subtitle2' component='h5' color='gray' marginBottom={1}>
                        Email: {user?.email}
                    </Typography>
                    
                    
                    <Typography variant='body1' component='p' marginBottom={3}>
                        {capitalizer(post?.body)}
                    </Typography>

                    <Typography variant='h5' component='h2' sx={{paddingTop: 3, paddingBottom: 3}}>
                        Comments
                    </Typography>

                    {comments.map(comment => (
                        <Container key={comment.id}>
                            <Typography variant='h6' component='h5' sx={{textTransform: 'capitalize'}}>
                                Title: {comment.name}
                            </Typography>
                            <Typography variant='subtitle2' component='h5' color='gray' marginBottom={1}>
                                Email: {comment.email}
                            </Typography>
                            <Typography variant='body1' component='p' key={comment.id} marginBottom={3}>
                                {capitalizer(comment.body)}
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