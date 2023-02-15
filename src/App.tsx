/**
 * Main App setup routing
 * 
 */

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostsView from './pages/PostsView'
import PostDetail from './pages/PostDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* First route matches the home posts list view */}
        <Route path="/" element={<PostsView />} />

        {/* Second route matches the post detail view */}
        <Route path="/post" element={<PostDetail/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
