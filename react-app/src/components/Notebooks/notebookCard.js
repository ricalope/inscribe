import { Link } from 'react-router-dom';
import Actions from '../Actions';
import './Notebooks.css';

function NotebookCard({ notebook, darkMode }) {

    const lengthCheck = (data, len) => {
        if (data.slice(0, len) > len) {
            return `${data.slice(0, len)}...`
        }
        return data
    }

    const formatDate = date => {
        date = new Date(date)
        const update = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'medium' }).format(date)
        return update
    }

    return (
        <tr key={notebook.id} className={darkMode ? "tr-dark" : "tr-light"}>
            <td>
                <Link
                    exact="true" to={`/notebooks/${notebook.id}`}
                    className={darkMode ? 'nb-one-link td-dark' : 'nb-one-link td-light'}>
                    <i className="fa-solid fa-book table-book" />&nbsp;
                    {`${lengthCheck(notebook.title, 20)} (${notebook?.notes?.length})`}
                </Link>
            </td>
            <td>{lengthCheck(notebook.user_email, 16)}</td>
            <td>{formatDate(notebook.updated_at)}</td>
            <td>
                <Actions
                    notebookId={notebook.id}
                />
            </td>
        </tr>
    )
}

export default NotebookCard;
