function Card({ dataList, handleClickCard }) {
    return (
      <div className="card-container">
        {dataList.map((data) => (
          <div key={data.id} className="card" onClick={() => handleClickCard(data.id)}>
            <div className="image-container">
              {data.image && <img src={data.image} alt={data.name} />}
            </div>
            <h3>{data.name}</h3>
          </div>
        ))}
      </div>
    );
}

export default Card;