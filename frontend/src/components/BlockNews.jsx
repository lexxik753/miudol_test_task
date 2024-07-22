import { Link } from "react-router-dom";


export default function BlockNews({ props }) {

    return (
        <>
            <div className="ml-7 text-3xl font-bold underline">Страница новостей</div>
            <section className="ml-7">
                <ol className="list-decimal">
                    {props.map((item) => <li key={item.id}><Link to={`/get_news/${item.id}`}>{item.title}</Link></li>)}
                </ol>
            </section>
        </>
    )
}