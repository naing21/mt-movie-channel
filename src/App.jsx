import Detail from "./components/Detail"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppStarter from "./pages/AppStarter"
import AppIndex from "./pages/AppIndex"
import Register from "./components/Register"
import Login from "./components/Login"
import MovieSearchPage from "./components/MovieSearchPage"
import TvShows from "./components/TvShows"
import Movies from "./components/Movies"
import Protected from "./components/Protected"
function App() {

  return (

   <BrowserRouter>
     <Routes>
       <Route path="/" element={<AppStarter/>}>
       <Route path="" index={true} element={<AppIndex/>} />
       <Route path="detail/:id" element={<Detail/>}/>
       <Route path="tvshows" element={<TvShows/>}/>
       <Route path="movies" element={<Movies/>}/>
       <Route path="search" element={<MovieSearchPage/>}/>
       <Route path="register" element={<Register/>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="/admin" element={<Protected allowedRoles={['admin']}><h1>Admin Page</h1></Protected>} />
       </Route>
     </Routes>
   </BrowserRouter>

  )
}
export default App
