import { Link } from "react-router-dom"

export default function MainPage() {
    return (
        <div>
            <h1>Главная страница</h1>
            <Link to={"/get_news"}> Перейти к новостям </Link>
        </div>
    )
}