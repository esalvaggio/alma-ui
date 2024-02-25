import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { fetchData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import { Link } from 'react-router-dom';
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Inbox</h1>
            <ul>
                {essaysMinimal.map((essay) => (
                    <li key={essay.id}>
                        <Link to={`/essay/${essay.id}`}>
                            {essay.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InboxPage;