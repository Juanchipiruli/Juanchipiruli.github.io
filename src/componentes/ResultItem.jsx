
export default function ResultItem({result}){
    return (
        <li key={result.id}>
            <img src={result.img} alt={result.name}/>
            <h3>{result.name}</h3>
            <p>${result.price}</p>
        </li>
    )
}