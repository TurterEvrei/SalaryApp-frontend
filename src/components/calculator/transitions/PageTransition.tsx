import { useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Transition.module.css'

function PageTransition({children} : {children: JSX.Element}) {
    const location = useLocation();

    return (
        <TransitionGroup className="page">
            <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={3000}
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
}

export default PageTransition;