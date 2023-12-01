import Card from "../Card/Card";

export default function Search(props){
    const ele = props.pokeBuscado
    console.log(ele);
    return(
        <div>
            <h2>"Pokemons encontrdos..."</h2>
            {ele && (
                <Card
                name={ele?.name}
                id={ele.id}
                vida={ele.vida}
                ataque={ele.ataque}
                defensa={ele.defensa}
                velocidad={ele.velocidad}
                altura={ele.velocidad}
                peso={ele.peso}
                image={ele.image}
                key={ele.id}
             />
            )}
        </div>
    )
}