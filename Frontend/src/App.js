import './App.css';
import React from 'react';
import MainCoursePage from "./components/homeComponents/courses/mainCoursePage";
import MainInstructorsPage from "./components/homeComponents/instructors/mainInstructorsPage";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";

import Home from "./components/homeComponents/home";
import About from "./components/homeComponents/about/about";
import SignUp from "./components/signPages/signUp";
import RootLayout from "./routers/rootLayout";
import SignUpStudent from "./components/signPages/signUpStudent";
import SignUpInstructor from "./components/signPages/signUpInstructor";
import ProfileNavMain from "./components/profilePage/profileNav/profileNavMain";
import ProfileInfo from "./components/profilePage/profileInfo/profileInfo";
import ProfileAppointments from "./components/profilePage/profileAppointments/profileAppointments";
import ProfileStudents from "./components/profilePage/profileStudents/profileStudents";
import ProfileInstructors from "./components/profilePage/profileInstructors/profileInstructors";
import ProfileTests from "./components/profilePage/profileTests/profileTests";
import Setting from "./components/setting/setting";
import SignInPage from "./components/signPages/signInPage";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home/>}/>
            <Route path="/signIn" element={<SignInPage/>}/>
            <Route path="/instructors" element={<MainInstructorsPage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/courses" element={<MainCoursePage/>}/>
            <Route path="/signUp" element={<SignUp/>}>
                <Route   path="student" element={<SignUpStudent/>}/>
                <Route   path="instructor" element={<SignUpInstructor/>}/>
            </Route>
            <Route path="/profile" element={<ProfileNavMain/>}>
                <Route   path="info" element={<ProfileInfo/>}/>
                <Route   path="appointments" element={<ProfileAppointments/>}/>
                <Route   path="students" element={<ProfileStudents/>}/>
                <Route   path="instructors" element={<ProfileInstructors/>}/>
                <Route   path="tests" element={<ProfileTests/>}/>
            </Route>
            <Route path="/settings" element={<Setting/>}/>
        </Route>
    )
)

function App() {

  return (
      <RouterProvider router={router}/>
  );
}

export default App;
