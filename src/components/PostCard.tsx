/**
 * PostCard component to display each post 
 * in the PostsView component
 *   
 */ 

import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material'
import { Post } from '../types/model.type'
import capitalizer from '../utils/capitalizer'

const PostCard = ({ post }: { post: Post }) => {

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <CardHeader 
                title={post.title}
                titleTypographyProps={{
                    variant: 'h5',
                    sx: {
                        textTransform: 'capitalize'
                    }
                }}    
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" marginBottom={2}>
                    { capitalizer(post.body.substring(0,100))}...
                </Typography>
                <Button size='small' variant="outlined" color="primary" href={`/post?id=${post.id}&userID=${post.userId}`}>Read More</Button>
            </CardContent>
        </Card>
    )
}

export default PostCard