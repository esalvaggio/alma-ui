import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import PageLayout from '../../components/PageLayout';
import style from './index.module.scss'
const InboxPage = () => {
    const [essaysMinimal, setEssaysMinimal] = useState([{ id: "", title: "", author: "" }])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getEssaysMinimal = async () => {
            try {
                const data = await fetchData(API_URLS.ESSAYS_MINIMAL)
                setEssaysMinimal(data);
                setLoading(false)
                setError(false)
            } catch {
                setError(true)
                setLoading(false)
            }
        }
        getEssaysMinimal()
    }, [])

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <PageLayout>
            <Header title="Inbox" />
            <div className={style.essayListContainer}>
                {essaysMinimal.map((essay) => (
                    <Link to={`/essay/${essay.id}`} className={style.essayLink}>
                        <div className={style.essayItem}>
                        <h2>{essay.title}</h2>
                        <p>{essay.author}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </PageLayout>
    );
};

export default InboxPage;