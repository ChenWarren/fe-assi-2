/**
 * This component fetches the posts list from the API 
 * and renders a link for each post
 */

import { useState, useEffect, useRef } from 'react'
import { Grid, Paper } from '@mui/material'
import { Container } from '@mui/system'
import NavigationBar from '../components/NavigationBar'
import PostCard from '../components/PostCard'
import { Post } from '../types/model.type'
import { dataService } from '../services/data.service'


// Define the PostsView component
const PostsView = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [renderPosts, setRenderPosts] = useState<Post[]>([])
    const [page, setPage] = useState(0)
    const targetObserver = useRef<HTMLDivElement>(null)

    // Use the useEffect hook to fetch the posts list from the API
    useEffect(()=> {
        dataService.getAllPosts()
            .then(response => {
                setPosts(response.data)
                setRenderPosts(response.data.slice(0, 20))
            })
            .catch( error => {
                console.log(error.message)
            })
    }, [])

    // Define the handleObserver function
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
        const target = entities[0]
        if ( target.isIntersecting ) {
            if ( page != 0 && page * 20 > posts.length ) {
                return
            }
            setRenderPosts(posts.slice(0, (page + 1) * 20))
            setPage(page + 1)
        }
    }


    // Use the useEffect hook to load more posts when the user scrolls to the bottom of the page
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        }

        // Initialize the IntersectionObserver and attach it to the targetObserver
        const observer = new IntersectionObserver(handleObserver, options)

        if ( targetObserver.current ) {
            observer.observe(targetObserver.current)
        }

        return () => {
            if ( targetObserver.current ) {
                observer.disconnect()
            }
        }

    }, [renderPosts])

    return (
        <>
            <NavigationBar title='Posts'/>
            { renderPosts && renderPosts.length > 0 &&
                <Container sx={{paddingY: 2, mt: 9}}>
                    <Grid container spacing={3}>
                        {/* Map over the posts array and render a link for each*/}
                        { renderPosts.map( post => (
                            <Grid item key={post.id} xs={12} sm={6} md={3}>
                                <Paper sx={{height: '100%',}} ref={targetObserver}>
                                    <PostCard post={post} />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            }
        </>
    )
}

export default PostsView