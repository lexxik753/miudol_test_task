import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


import backendURL from "../../backendURL";

export default function QueryNews() {
    const [newsById, setNewsById] = useState([])

    const { id } = useParams()
    useEffect(() => {
        fetch(`${backendURL}/get_news/${id}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setNewsById(data.results)
            })
    }, [])

    return (
        <>
            <section className="m-5 w-9/12">
                <h3 className="font-bold text-2xl">{newsById.map(item => item.title)}</h3>
                <div className="text-wrap">
                    <p className="py-5">{newsById.map(item => item.text)}</p>
                    {newsById.map((item) => <img className="pb-5" src={item.name} key={item.id}/>) }
                    <span><strong>Автор статьи:</strong> {newsById.map(item => item.author)}</span>
                </div>
            </section>
        </>
    )
}