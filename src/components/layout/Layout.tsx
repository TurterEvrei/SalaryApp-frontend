import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import {List} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import SidebarAnother from "../variants/SidebarAnother";
import Sidebar from "./sidebar/Sidebar";
import cl from './Layout.module.css'

const Layout = () => {

    const [isShowSidebar, setShowSidebar] = useState<boolean>(false);

    function showSidebarHandler() {
        setShowSidebar(!isShowSidebar);
        console.log(isShowSidebar)
    }

    // let arrow = document.getElementsByClassName("arrow");
    // console.log(arrow)
    // for (var i = 0; i < arrow.length; i++) {
    //     arrow[i].addEventListener("click", (e)=>{
    //         // @ts-ignore
    //         let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
    //         arrowParent.classList.toggle("showMenu");
    //     });
    // }
    // let sidebar = document.getElementsByClassName(".sidebar");
    // let sidebarBtn = document.getElementsByClassName(".bx-menu");
    // console.log(sidebarBtn);
    // // @ts-ignore
    // sidebarBtn.addEventListener("click", ()=>{
    //     // @ts-ignore
    //     sidebar.classList.toggle("close");
    // });

    return (
        <>
            {/*<SidebarAnother isShowSidebar={isShowSidebar}/>*/}
            <Sidebar/>
            {/*<section className="home-section">*/}
            {/*    <div className="home-content">*/}
            {/*        <Button onClick={showSidebarHandler}*/}
            {/*                variant="outline-dark"*/}
            {/*        >*/}
            {/*            <List size={30}/>*/}
            {/*        </Button>*/}

            {/*        <span className="text">Drop Down SidebarAnother</span>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list"*/}
            {/*     viewBox="0 0 16 16">*/}
            {/*    <path fillRule="evenodd"*/}
            {/*          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>*/}
            {/*</svg>*/}
            <section className={cl.contentSection}>
                <Outlet/>
            </section>
        </>
    );
};

export default Layout;