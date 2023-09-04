import {Link, useMatch, useResolvedPath} from "react-router-dom"

export default function NavBar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title"> Lar Silvana </Link>
            <ul>
                <CustomLink to="/sobre">Sobre o Abrigo</CustomLink>
                <CustomLink to="/doar">Doar</CustomLink>
                <CustomLink to="/adotar">Adotar</CustomLink>
                <CustomLink to="/contato">Contato</CustomLink>
                <CustomLink to="/faq">FAQ</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
  )
}