import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const PokeInfo = () => {

    const params = useParams();

    const [pokemon, getPokemon] = useFetch();
    
    useEffect(() => {
      const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
      getPokemon(url);
    }, []);
    


    console.log(pokemon);

  return (
    <section>
      <figure>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
      </figure>
      <span># {pokemon?.id}</span>
      <h2>{pokemon?.name}</h2>
      <ul>
        <li><span>weight</span><span>{pokemon?.weight}</span></li>
        <li><span>height</span><span>{pokemon?.height}</span></li>
      </ul>
      <div>
        <article>
          <h3>type</h3>
          <ul>
            {
              pokemon?.types.map(type => (
                <li key={type.type.url}>{type.type.name}</li>
              ))
            }
          </ul>
        </article>
        <article>
          <h3>skills</h3>
          <ul>
            {
              pokemon?.abilities.map(skill => (
                <li key={skill.ability.url}>{skill.ability.name}</li>
              ))
            }
          </ul>
        </article>
      </div>
      <h2>Stats</h2>
      <ul>
        {
          pokemon?.stats.map(stat => (
            <li key={stat.stat.url}><span>{stat.stat.name}</span><span>{stat.base_stat}/150</span>
            <div><div></div></div></li>
          ))
        }
      </ul>
      <h2>Movements</h2>
      <ul>
        {
          pokemon?.moves.map(move => (
            <li key={move.move.url}>{move.move.name}</li>
          ))
        }
        </ul>
    </section>
  )
}

export default PokeInfo;